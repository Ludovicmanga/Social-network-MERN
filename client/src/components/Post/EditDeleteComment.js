import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentPost, editCommentPost } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = ({ comment, postId }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(false);

        if (text) {
            dispatch(editCommentPost(postId, comment._id, text));
            setText('');
        }
    }

    const handleDelete = () => {
        dispatch(deleteCommentPost(postId, comment._id));
    }

    useEffect(() => {
        const checkAuthor = () => {
            if(uid === comment.commenterId) {
                setIsAuthor(author => author = true );
            }
        }
        checkAuthor();
    }, [uid, comment.commenterId]);

    return (
        <div className='edit-comment'>
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img src='./img/icons/edit.svg' alt='edit-comment' />
                </span>
            )}
            {isAuthor && edit && (
                <form action='' onSubmit={ handleEdit } className='edit-comment-form'>
                    <label htmlFor='text' onClick={() => setEdit(!edit)}>
                        Ne pas editer
                    </label>
                    <input
                        type='text'
                        name='text'
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.text} 
                    />
                    <br />
                    <div className='btn'>
                        <span onClick={() => {
                            if(window.confirm('voulez-vous supprimer ce commentaire ?')) {
                                handleDelete()
                            }
                        }}>
                            <img src="./img/icons/trash.svg" alt="delete" />
                        </span>
                        <input type='submit' value='valider modifications' />
                    </div>
                </form>
            )}
        </div>
    )
}

export default EditDeleteComment
