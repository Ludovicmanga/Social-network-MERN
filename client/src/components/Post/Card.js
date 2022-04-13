import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import FollowHandler from '../Profil/FollowHandler';
import { dateParser, isEmpty } from '../Utils';
import LikeButton from './LikeButton';

export default function Card({ post }) {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer)
    const loggedUserData = useSelector((state) => state.userReducer)

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(() => false);
    }, [usersData])

  return (
    <li className='card-container' key={post._id}>
        {isLoading ? (
            <i className='fas fa-spinner fa-spin'></i>
        ): (
            <>
                <div className='card-left'>
                    <img src = {
                        !isEmpty(usersData[0]) &&
                        usersData.map(user => {
                            if (user._id === post.posterId) {
                                return user.picture
                            }
                        }).join('')
                    }
                        alt='post-picture'
                    />
                </div>
                <div className='card-right'>
                    <div className='card-header'>
                        <div className='pseudo'>
                            <h3>
                            {
                                !isEmpty(usersData[0]) &&
                                usersData.map(user => {
                                    if (user._id === post.posterId) {
                                        return user.pseudo
                                    }
                                })
                            }
                            </h3>
                            {post.posterId !== loggedUserData._id && (
                                <FollowHandler idToFollowOrUnfollow = {post.posterId} type='card' />
                            )}
                            
                        </div>
                            <span>{dateParser(post.createdAt)}</span>
                    </div>
                    <p>{post.message}</p>
                    {
                        post.picture && (
                            <img src={post.picture} alt='card-picture' className='card-pic' />
                        )
                    }
                    {
                        post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post._id}
                            />
                        )
                    }
                    <div className='card-footer'>
                        <div className='comment-icon'>
                            <img src="./img/icons/message1.svg" alt="comment" />
                            <span>{post.comments.length}</span>
                        </div>
                        <LikeButton post={post} />
                        <img src="./img/icons/share.svg" alt="share" />
                    </div>
                </div>
            </>
        )}
    </li>
  )
}
