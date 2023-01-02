import { useEffect, useRef, useCallback } from 'react';
import freeice from 'freeice';
import { initSocket } from '../socket';
import { useStateWithCallback } from './useStateWithCallback';

export const useWebRTC = (roomId, user) => {
	const [clients, setClients] = useStateWithCallback([]);
	const audioElements = useRef({});
	const connections = useRef({});
	const socket = useRef(null);
	const localMediaStream = useRef(null);
	const clientsRef = useRef(null);

	const addNewClient = useCallback(
		(newClient, cb) => {
			const lookingFor = clients.find(
				(client) => client.uid === newClient.uid
			);

			if (lookingFor === undefined) {
				setClients(
					(existingClients) => [...existingClients, newClient],
					cb
				);
			}
		},
		[clients, setClients]
	);

	useEffect(() => {
		clientsRef.current = clients;
	}, [clients]);

	useEffect(() => {
		console.log('useeffect webrtc user', user);
		const initChat = async () => {
			socket.current = await initSocket('voiceCall');

			await captureMedia();
			addNewClient({ ...user, muted: true }, () => {
				const localElement = audioElements.current[user.uid];
				if (localElement) {
					localElement.volume = 0;
					localElement.srcObject = localMediaStream.current;
				}
			});

			// socket.current.on('muteInfo', ({ userId, isMute }) => {
			//     handleSetMute(isMute, userId);
			// });
			socket.current.on('addPeer', handleNewPeer);
			socket.current.on('removePeer', handleRemovePeer);
			socket.current.on('iceCandidate', handleIceCandidate);
			socket.current.on('sesssionDescription', setRemoteMedia);
			// socket.current.on('mute', ({ peerId, userId }) => {
			//     handleSetMute(true, userId);
			// });
			// socket.current.on('unmute', ({ peerId, userId }) => {
			//     handleSetMute(false, userId);
			// });

			socket.current.emit('join', {
				roomId,
				user,
			});

			async function captureMedia() {
				localMediaStream.current =
					await navigator.mediaDevices.getUserMedia({
						audio: true,
					});
			}
			async function handleNewPeer({
				peerId,
				createOffer,
				user: remoteUser,
			}) {
				if (peerId in connections.current) {
					return alert(
						`You are already connected with ${peerId} (${user.name})`
					);
				}

				// Store it to connections
				connections.current[peerId] = new RTCPeerConnection({
					iceServers: freeice(),
				});

				// Handle new ice candidate on this peer connection
				connections.current[peerId].onicecandidate = (event) => {
					if (!event.candidate) {
						return;
					}
					socket.current.emit('relayIce', {
						peerId,
						icecandidate: event.candidate,
					});
				};

				// Handle on track event on this connection
				connections.current[peerId].ontrack = ({
					streams: [remoteStream],
				}) => {
					addNewClient({ ...remoteUser, muted: true }, () => {
						// get current users mute info
						// const currentUser = clientsRef.current.find(
						//     (client) => client.id === user.uid
						// );
						// if (currentUser) {
						//     socket.current.emit('muteInfo', {
						//         userId: user.uid,
						//         roomId,
						//         isMute: currentUser.muted,
						//     });
						// }
						if (audioElements.current[remoteUser.uid]) {
							audioElements.current[remoteUser.uid].srcObject =
								remoteStream;
						} else {
							let settled = false;
							const interval = setInterval(() => {
								if (audioElements.current[remoteUser.uid]) {
									audioElements.current[
										remoteUser.uid
									].srcObject = remoteStream;
									settled = true;
								}
								if (settled) {
									clearInterval(interval);
								}
							}, 1000);
						}
					});
				};

				// Add connection to peer connections track
				localMediaStream.current.getTracks().forEach((track) => {
					connections.current[peerId].addTrack(
						track,
						localMediaStream.current
					);
				});

				// Create an offer if required
				if (createOffer) {
					const offer = await connections.current[
						peerId
					].createOffer();

					// Set as local description
					await connections.current[peerId]
						.setLocalDescription(offer)
						.then(console.log('Remote description set'))
						.catch((error) => {
							alert(
								'Error setting remote description: ' +
									error +
									' plese reload the page'
							);
						});

					// send offer to the server
					socket.current.emit('relaySdp', {
						peerId,
						sessionDescription: offer,
					});
				}
			}
			async function handleRemovePeer({ peerId, userId }) {
				// Correction: peerID to peerId
				if (connections.current[peerId]) {
					connections.current[peerId].close();
				}

				delete connections.current[peerId];
				delete audioElements.current[peerId];
				setClients((list) => list.filter((c) => c.id !== userId));
			}
			async function handleIceCandidate({ peerId, icecandidate }) {
				const connection = connections.current[peerId];
				if (icecandidate) {
					// prettier-ignore
					connection.addIceCandidate(icecandidate)
						.then(console.log('ICE candidate added'))
						.catch((error) => {
							console.log('ice candidate - ', icecandidate);
							alert('Error adding ICE candidate: ' + error + ' plese reload the page');
						});
				}
			}
			async function setRemoteMedia({
				peerId,
				sessionDescription: remoteSessionDescription,
			}) {
				connections.current[peerId].setRemoteDescription(
					new RTCSessionDescription(remoteSessionDescription)
				);

				// If session descrition is offer then create an answer
				if (remoteSessionDescription.type === 'offer') {
					const connection = connections.current[peerId];

					const answer = await connection.createAnswer();
					connection.setLocalDescription(answer);

					socket.current.emit('relaySdp', {
						peerId,
						sessionDescription: answer,
					});
				}
			}
			// async function handleSetMute(mute, userId) {
			//     const clientIdx = clientsRef.current
			//         .map((client) => client.id)
			//         .indexOf(userId);
			//     const allConnectedClients = JSON.parse(
			//         JSON.stringify(clientsRef.current)
			//     );
			//     if (clientIdx > -1) {
			//         allConnectedClients[clientIdx].muted = mute;
			//         setClients(allConnectedClients);
			//     }
			// }
		};

		initChat();

		return () => {
			localMediaStream.current
				.getTracks()
				.forEach((track) => track.stop());
			socket.current.emit('leave', { roomId });
			for (let peerId in connections.current) {
				connections.current[peerId].close();
				delete connections.current[peerId];
				delete audioElements.current[peerId];
			}
			socket.current.disconnect();
			socket.current.off('addPeer');
			socket.current.off('removePeer');
			socket.current.off('iceCandidate');
			socket.current.off('sesssionDescription');
			socket.current.off('mute');
			socket.current.off('unmute');
		};
	}, []);

	const provideRef = (instance, userId) => {
		audioElements.current[userId] = instance;
	};

	// const handleMute = (isMute, userId) => {
	//     let settled = false;
	//     console.log(
	//         'inside webrtc userId -> ',
	//         userId,
	//         'user.uid -> ',
	//         user.uid,
	//         'isMute -> ',
	//         isMute
	//     );
	//     if (userId === user.uid) {
	//         let interval = setInterval(() => {
	//             if (localMediaStream.current) {
	//                 localMediaStream.current.getTracks()[0].enabled = !isMute;
	//                 if (isMute) {
	//                     socket.current.emit('mute', {
	//                         roomId,
	//                         userId: user.uid,
	//                     });
	//                 } else {
	//                     socket.current.emit('unmute', {
	//                         roomId,
	//                         userId: user.uid,
	//                     });
	//                 }
	//                 settled = true;
	//             }
	//             if (settled) {
	//                 clearInterval(interval);
	//             }
	//         }, 200);
	//     }
	// };

	return {
		clients,
		provideRef,
		// handleMute,
	};
};
