import React, { useState, useEffect } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { VscComment } from 'react-icons/vsc'
import { FiSend, FiMoreHorizontal } from 'react-icons/fi'
import { BsBookmark } from 'react-icons/bs'
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { ViewPost } from '../../Components'
import { PostMoreMenu } from '.'


export const PostCards = ({ post, username }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [postClick, setPostClick] = useState<boolean>(false)
    const [postData, setpostData] = useState(post)
    const [more, setMore] = useState(false)
    const [user, setUser] = useState(false)
    useEffect(() => {
        setUser(username==post.username)
    }, [])
    
    const handleLike = async () => {
        if (!isLiked) {
            try {

                api.postLike({ id: post.id, username: username }).then((response) => {
                    console.log(response, '///////');

                    if (response.data.success) {
                        setpostData(response.data.data[0])
                        
                    }
                }).catch((err) => {
                    console.log(err);

                })

                setIsLiked(true);
            } catch (error) {
                console.error('Error liking post:', error);
            }
        }
    };

    const handleUnlike = async () => {
        if (isLiked) {
            try {
                api.postUnlike({ id: post.id, username: username }).then((response) => {
                    console.log(response, '///////like');
                    if (response.data.success) {
                        setpostData(response.data.data[0])
                       

                    }
                }).catch((err) => {
                    console.log(err);

                })
                setIsLiked(false);
            } catch (error) {
                console.error('Error unliking post:', error);
            }
        }
    };

    useEffect(() => {

        setIsLiked(postData.likedBy.some((postUsername) => postUsername == username))

    }, [username])


    const handlePostView =() => {
        console.log('///////////////////////////');

        setPostClick(true)


    }

    return (
        <div className='flex flex-col gap-2 bg-white rounded-xl border border-slate-200'>
            <div className='flex flex-row justify-between items-center mt-2 mx-4'>
                <div className='flex flex-row items-center gap-4'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s'
                        className='h-10 w-10 rounded-full object-cover' />
                    <span><Link
                        to={'/' + postData.username}>{postData.username}</Link></span>
                </div>
                <div>
                <button onClick={() => setMore(!more)}><FiMoreHorizontal className='w-6 h-6' /></button>
                </div>
            </div>
            <div>
                <img className='w-full' src={postData.post_url} />
            </div>
            <div className='flex my-2 mb-4 mx-4 flex-row justify-between'>
                <div className='flex flex-row gap-4 items-center'>
                    <button onClick={handleLike} hidden={isLiked}><AiOutlineHeart className='w-8 h-8' /></button>
                    <button onClick={handleUnlike} hidden={!isLiked}><AiFillHeart className='w-8 h-8' /></button>
                    <button onClick={() => handlePostView()}><VscComment className='w-8 h-8' /></button>
                    <FiSend className='w-7 h-7' />
                </div>
                <BsBookmark className='w-6 h-6' />
            </div>
            <div className='mb-4 mx-4'>
                <div className='flex flex-row gap-4 items-center mb-2'>
                    <img className='w-6 h-6 rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s' />
                    <p>Like by <strong>{postData.likedBy[0]} </strong>and <strong>other {postData.likes} </strong> </p>
                </div>
                <p>
                    {postData.caption}
                </p>
                {/* <span className='text-slate-500 text-sm'>Show all the 164 comments</span> */}
                <p className='mt-2 text-slate-600 text-xs uppercase'>{formatDistanceToNow(new Date(postData.createdAt), { addSuffix: true })}</p>
            </div>
            {postClick && (<ViewPost post={postData} postClick={postClick} username={username} setPostClick={setPostClick} likedBy={isLiked} />)}
            {more && <PostMoreMenu post={postData} setMore={setMore} user={user} />}
        </div>
    )
}

export default PostCards