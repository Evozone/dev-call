import React, { useState } from 'react';
import {
    collection,
    getDocs,
    query,
    where,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    serverTimestamp,
} from 'firebase/firestore';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
// import CloseIcon from '@mui/icons-material/Close';

import { db } from '../firebaseConfig';

const data = [
    {
        username: 'thebrahmnicboy',
        id: '1',
    },
    {
        username: 'thebrahmnicboy',
        id: '2',
    },
    {
        username: 'thebrahmnicboy',
        id: '3',
    },
    {
        username: 'thebrahmnicboy',
        id: '4',
    },
];

function TabPanel(props) {
    const { item, value, index, empty, loading, handleSelect, ...other } =
        props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && !empty && !loading && (
                <Box sx={{ p: 0 }}>
                    <ListItem onClick={handleSelect} sx={{ p: 0 }}>
                        <ListItemButton sx={{ px: 2, height: '70px' }}>
                            <Avatar
                                alt={item.username.charAt(0).toUpperCase()}
                                src={item.photoURL}
                                sx={{ width: 50, height: 50, mr: 2 }}
                            />
                            <Typography sx={{ mb: 3, fontSize: '18px' }}>
                                {item.username}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </Box>
            )}
            {value === index && empty && !loading && (
                <Box
                    sx={{
                        p: 0,
                        height: '400px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ mb: 3, fontSize: '18px' }}>
                        No user found 🙁
                    </Typography>
                </Box>
            )}
            {value === index && loading && (
                <Box
                    sx={{
                        p: 0,
                        height: '400px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Typography sx={{ mb: 3, fontSize: '18px' }}>
                        Type username & <br /> press Enter or click on 🔍 to
                        search
                    </Typography>

                    <Divider />
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function TabsNav({ mode }) {
    const [value, setValue] = useState(0);
    const [searchResults, setSearchResults] = useState(null);
    const [foundUser, setFoundUser] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);

    const currentUser = useSelector((state) => state.auth);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSearch = async () => {
        if (!searchText) {
            alert('Please enter a valid username');
            return;
        }
        const q = query(
            collection(db, 'users'),
            where('username', '==', searchText.toLowerCase())
        );
        try {
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setFoundUser(false);
                setSearchResults(null);
            } else {
                querySnapshot.forEach((doc) => {
                    setSearchResults(doc.data());
                    setFoundUser(true);
                });
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch();
    };

    const handleSearchText = (e) => {
        setSearchResults(null);
        setLoading(true);
        setFoundUser(true);
        setSearchText(e.target.value);
    };

    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > searchResults.uid
                ? currentUser.uid + searchResults.uid
                : searchResults.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: searchResults.uid,
                        name: searchResults.name,
                        photoURL: searchResults.photoURL,
                        username: searchResults.email.split('@')[0],
                        email: searchResults.email,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', searchResults.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        name: currentUser.name,
                        photoURL: currentUser.photoURL,
                        username: currentUser.username,
                        email: currentUser.email,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (err) {
            console.log(err);
        }
        setSearchResults(null);
        setLoading(true);
        setFoundUser(true);
        setSearchText('');
        setValue(0);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
            <AppBar elevation={0} color='inherit' position='static'>
                <Tabs
                    sx={{ height: '75px', alignItems: 'center' }}
                    value={value}
                    onChange={handleChange}
                    textColor='inherit'
                    variant='fullWidth'
                    aria-label='full width tabs example'
                >
                    <Tab
                        sx={{
                            height: '75px',
                            fontSize: '1.1rem',
                            ...(mode === 'dark'
                                ? {
                                      borderRight:
                                          '1px solid rgba(255, 255, 255, 0.12)',
                                      borderBottom:
                                          '1px solid rgba(255, 255, 255, 0.12)',
                                  }
                                : {
                                      borderRight:
                                          '1px solid rgba(0, 0, 0, 0.12)',
                                      borderBottom:
                                          '1px solid rgba(0, 0, 0, 0.12)',
                                  }),
                        }}
                        label='CHATS'
                        {...a11yProps(0)}
                    />
                    <Tab
                        sx={{
                            height: '75px',
                            fontSize: '1.1rem',
                            ...(mode === 'dark'
                                ? {
                                      borderBottom:
                                          '1px solid rgba(255, 255, 255, 0.12)',
                                  }
                                : {
                                      borderBottom:
                                          '1px solid rgba(0, 0, 0, 0.12)',
                                  }),
                        }}
                        label='SEARCH'
                        {...a11yProps(1)}
                    />
                </Tabs>
            </AppBar>
            <List sx={{ p: 0 }}>
                {data.map((item) => {
                    return (
                        <TabPanel
                            item={item}
                            value={value}
                            index={0}
                            key={item.id}
                        />
                    );
                })}
            </List>
            <List sx={{ p: 0 }}>
                {value === 1 && (
                    <TextField
                        label='username'
                        sx={{
                            m: 2,
                            width: '93%',
                            '& .MuiOutlinedInput-root': {
                                paddingRight: '6px',
                                borderRadius: '20px',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleSearch}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        size='small'
                        value={searchText}
                        onChange={(e) => handleSearchText(e)}
                        onKeyDown={handleKey}
                    />
                )}
                <Divider />
                {searchResults && (
                    <TabPanel
                        handleSelect={handleSelect}
                        item={searchResults}
                        value={value}
                        index={1}
                    />
                )}
                {!foundUser && searchText != '' && (
                    <TabPanel empty={true} value={value} index={1} />
                )}
                {loading && <TabPanel loading={true} value={value} index={1} />}
            </List>
        </Box>
    );
}
