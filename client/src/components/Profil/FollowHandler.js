import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/user.actions';
import { isEmpty } from '../Utils';

export default function FollowHandler({ idToFollowOrUnfollow }) {

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
                    <button className='unfollow-btn'>Abonné</button>
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) && (
                <span onClick={handleFollow}>
                <button className='follow-btn'>Suivre</button>
            </span>
            )}
            
        </>
    )
}
