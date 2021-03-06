import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBio } from '../../actions/user.actions';
import LeftNav from '../LeftNav'
import { dateParser } from '../Utils';
import FollowHandler from './FollowHandler';
import UploadImg from './UploadImg';

export default function UpdateProfil() {
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector(state => state.userReducer);
    const usersData = useSelector(state => state.usersReducer);
    const [bio, setBio] = useState(userData.bio);
    const dispatch = useDispatch();
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);
    const error = useSelector(state => state.errorReducer.userError);

    const handleUpdate = () => {
        dispatch(updateBio(bio, userData._id));
        setUpdateForm(false);
    }

    return (
        <div className='profil-container'>
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1>
            <div className='update-container'>
                <div className='left-part'>
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg postType='user' />
                    {error.format && (<p>{error.format}</p>)}
                    {error.maxSize && (<p>{error.maxSize}</p>)}
                </div>
                <div className='right-part'>
                    <div className='bio-update'>
                        <h3>Bio</h3>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea
                                    type="text"
                                    defaultValue={userData.bio}
                                    onChange={(e) => {
                                        setBio(bio => bio = e.target.value);
                                    }}
                                >
                                </textarea>
                                <button onClick={handleUpdate}>Modifier bio</button>
                            </>
                        )}
                    </div>
                    <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
                    <h5 onClick={() => {setFollowingPopup(!followingPopup)
                    } }>Abonnements: {userData.following ? userData.following.length : 0}</h5>
                    <h5 onClick={() => setFollowersPopup(!followersPopup) }>Abonn??s: {userData.followers ? userData.followers.length : 0}</h5>
                </div>
            </div>
            <div>
                {followingPopup && (
                    <div className='popup-profil-container'>
                        <div className='modal'>
                            <h3>Abonnements</h3>
                            <span className='cross' onClick={() => setFollowingPopup(!followingPopup)}>&#10005;</span>
                            <ul>
                                {usersData.map(user => {
                                    for (let i = 0; i < userData.following.length; i++ ) {
                                        if (user._id === userData.following[i]) {
                                            return (
                                                <li key={user._id}>
                                                    <img src={user.picture} alt='user-pic' />
                                                    <h4>{user.pseudo}</h4>
                                                    <div className='follow-handler'>
                                                        <FollowHandler idToFollowOrUnfollow = {user._id} type='suggestion' />
                                                    </div>
                                                </li>
                                            )
                                        }
                                    } return null
                                })}
                            </ul>
                        </div>
                    </div>
                )}
                {followersPopup && (
                    <div className='popup-profil-container'>
                        <div className='modal'>
                            <h3>Abonn??s</h3>
                            <span className='cross' onClick={() => setFollowersPopup(!followersPopup)}>&#10005;</span>
                            <ul>
                                {usersData.map(user => {
                                    for (let i = 0; i < userData.followers.length; i++ ) {
                                        if (user._id === userData.followers[i]) {
                                            return (
                                                <li key={user._id}>
                                                    <img src={user.picture} alt='user-pic' />
                                                    <h4>{user.pseudo}</h4>
                                                    <div className='follow-handler'>
                                                        <FollowHandler idToFollowOrUnfollow = {user._id} type='suggestion' />
                                                    </div>
                                                </li>
                                            )
                                        }
                                    } return null
                                })}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
