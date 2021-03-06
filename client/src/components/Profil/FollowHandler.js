import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/user.actions';
import { isEmpty } from '../Utils';

export default function FollowHandler({ idToFollowOrUnfollow, type }) {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);

    const handleFollow = () => {
        dispatch(followUser(idToFollowOrUnfollow, userData._id));
        setIsFollowed(true);
    }

    const handleUnfollow = () => {
        dispatch(unfollowUser(idToFollowOrUnfollow, userData._id));
        setIsFollowed(false);
    }

    useEffect(() => {
        if (!isEmpty(userData.following)) {
            if (userData.following.includes(idToFollowOrUnfollow)) {
                setIsFollowed(true);
            } else setIsFollowed(false);
        }
    }, [userData, idToFollowOrUnfollow])

    return (
        <>
            {isFollowed && !isEmpty(userData) && (
                <span onClick={handleUnfollow}>
                    {type === 'suggestion' && <button className='unfollow-btn'>Abonné</button>}
                    {type === 'card' && <img src='./img/icons/checked.svg' alt='checked' />}
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) && (
                <span onClick={handleFollow}>
                    {type === 'suggestion' && <button className='follow-btn'>Suivre</button>}
                    {type === 'card' && <img src='./img/icons/check.svg' alt='check' />}
                </span>
            )}
            
        </>
    )
}
