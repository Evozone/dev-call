import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from '../firebaseConfig';

jest.mock('firebase/app');
jest.mock('firebase/firestore');
jest.mock('firebase/auth');
jest.mock('firebase/storage');

describe('firebaseConfig', () => {
    it('should initialize Firebase app with the correct config', () => {
        const app = initializeApp(firebaseConfig);
        expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
    });

    it('should return a Firestore instance', () => {
        const db = getFirestore();
        expect(getFirestore).toHaveBeenCalled();
    });

    it('should return a Auth instance', () => {
        const auth = getAuth();
        expect(getAuth).toHaveBeenCalled();
    });

    it('should return a Storage instance', () => {
        const storage = getStorage();
        expect(getStorage).toHaveBeenCalled();
    });
});
