import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CodePlayGround() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth);

    useEffect(() => {
        if (!window.localStorage.getItem('dev')) {
            navigate('/');
        }
        document.title = 'Dev Chat+ Code';
    }, [currentUser]);

    return <div>CodePlayGround</div>;
}
