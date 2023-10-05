import React, { useState, useEffect, useCallback } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { FiMoreHorizontal, FiSend } from 'react-icons/fi'
import { VscComment } from 'react-icons/vsc'
import { formatDistanceToNow } from 'date-fns';
import api from '../../services/api'
import { useDispatch } from 'react-redux'
import { updatePost } from '../../redux/userSlice'
import { PostMoreMenu } from '.'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'


export const PostDetail = ({ post, username, likedBy }) => {
    const parsedTimestamp = new Date(post.createdAt);
    const timeAgo = formatDistanceToNow(parsedTimestamp, { addSuffix: true });
    const [isLiked, setIsLiked] = useState(likedBy);
    const dispatch = useDispatch()
    const [more, setMore] = useState(false)
    const [postData, setPostData] = useState(post)
    const [user, setUser] = useState(false)
    const [usernameComment, setUsernameComment] = useState(username)
    const [formData, setFormData] = useState({
        comment: '',
        username: username,
        id: post.id
    })

    const [commentFlow, setCommentFlow] = useState(false)
    const [comments, setComments] = useState([])
    const [hasMore, setHasMore] = useState(true);
    let page = 1
    const handleLike = async () => {
        if (!isLiked) {
            try {

                api.postLike({ id: post.id, username: username }).then((response) => {
                    console.log(response, '///////');

                    if (response.data.success) {

                        setPostData(response.data.data[0])
                        if (username == post.username) {
                           /*  dispatch(updatePost(response.data.data[0])) */
                        }


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
    const loadPost = useCallback(async () => {
        console.log('get',page);
        
        if (page === 0) return page = 1
        if (!hasMore) return;

        setUser(username == post.username)
        api.getComment(post.id, page).then((response) => {
            console.log(response,'not');

            if (response.data.success) {
                if (response.data.data.length === 0) {
                    setHasMore(false);
                } else {
                    page += 1
                    setComments((prevComment) => [...response.data.data, ...prevComment])
                }
            }
        }).catch((err) => {
            console.log(err,'in');

        })
    }, [post])

    const handleScroll = () => {


        const { scrollTop, clientHeight, scrollHeight } = document.getElementById('commentScroll');
        console.log(scrollTop, clientHeight, scrollHeight);

        if (scrollTop + clientHeight >= scrollHeight - 20) {
            loadPost();
        }

       
    };

    useEffect(() => {
        loadPost()
    }, [post])
    useEffect(() => {


        const MessageScroll = document.getElementById('commentScroll')
        MessageScroll.addEventListener('scroll', handleScroll);
        return () => {
            MessageScroll.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore]);

    const handleUnlike = async () => {
        if (isLiked) {
            try {
                api.postUnlike({ id: post.id, username: username }).then((response) => {
                    console.log(response, '///////like');
                    if (response.data.success) {

                        setPostData(response.data.data[0])
                        if (username == post.username) {
                        /*     dispatch(updatePost(response.data.data[0])) */
                        }
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




    const handleComment = (event) => {
        event.preventDefault()
        api.addComment(formData).then((response) => {
            console.log(response);
            if (response.data.success) {
                setComments([...response.data.data, ...comments])
                formData.comment = ''
            }
        }).catch((err) => {
            console.log(err);

        })
    }

    const handleDeleteComment = (comment) => {
        console.log(comment, 'deletedd,');
        api.deleteComment(comment.comment_id).then((response) => {
            console.log(response);
            if (response.data.success) {
                setComments((prevComment) => prevComment.filter((comt) => comt.comment_id != comment.comment_id))
            }

        }).catch((err) => {
            console.log(err);

        })

    }
    return (
        <div className='flex flex-col gap-2 h-full bg-white rounded-xl border border-slate-200'>
            <div className='flex flex-row justify-between items-center mt-2 mx-4  '>
                <div className='flex flex-row items-center gap-4'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s'
                        className='h-10 w-10 rounded-full object-cover' />
                    <Link to={`/${post.username}`}><span>{post.username}</span></Link>
                </div>
                <div>
                    <button onClick={() => setMore(!more)}><FiMoreHorizontal className='w-6 h-6' /></button>

                    {/* <div className="p-4 bg-white  absolute space-y-4">
                        <h2 className="text-xl font-bold">Report Menu</h2>
                        <form onSubmit={handleSubmit}  className="space-y-2">
                            <div>
                                <label htmlFor="reportType" className="block font-semibold">
                                    Select Report Type:
                                </label>
                                <select
                                    id="reportType"
                                    value={selectedType}
                                    onChange={handleTypeChange}
                                    className="block w-full py-2 px-3 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                >
                                    <option value="">Select...</option>
                                    <option value="scamOrFraud">Scam or fraud</option>
                                    <option value="spam">it's spam</option>
                                    <option value="violenceOrDangerous">Violence or dangerous organizations</option>
                                    <option value="suicideOrSelfInjury">SuideOrSelfInjury</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                hidden={!selectedType}

                            >
                                Submit
                            </button>
                        </form>
                    </div> */}
                </div>
            </div>

            <div className='border'>
            </div>

            <div id='commentScroll' className='m-5 h-[600px] overflow-y-auto no-scrollbar '>
                {
                    comments.map((comment) => {

                        return (
                            <div className={'flex w-full mt-3 flex-row items-center gap-4 group'}>
                                {usernameComment === username && <div onClick={() => handleDeleteComment(comment)} className='cursor-pointer opacity-0 group-hover:opacity-100 '> <MdDelete /></div>}
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s'
                                    className='h-10 w-10 rounded-full object-cover' />
                                <h2>{comment.username}</h2>
                                <p onClick={() => setCommentFlow(!commentFlow)} className={commentFlow ? 'break-words max-w-[330px] overflow-hidden cursor-pointer' : 'max-w-[330px] overflow-hidden cursor-pointer  text-ellipsis'}>{comment.text}</p>
                            </div>

                        )
                    })
                }
            </div>
            <div className='mt-auto'>


                <div className='flex my-2 mb-4 mx-4 flex-row justify-between'>
                    <div className='flex flex-row gap-4 items-center'>
                        <button onClick={handleLike} hidden={isLiked}><AiOutlineHeart className='w-8 h-8' /></button>
                        <button onClick={handleUnlike} hidden={!isLiked}><AiFillHeart className='w-8 h-8' /></button>
                        <VscComment className='w-8 h-8' />
                        <FiSend className='w-7 h-7' />
                    </div>
                    <BsBookmark className='w-6 h-6' />
                </div>
                <div className='mb-4 mx-4'>
                    <div className='flex flex-row gap-4 items-center mb-2'>
                        <img className='w-6 h-6 rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLUCPistBn0PJFcVDwyhZHnyKEzMasUu2kf8EQSDN&s' />
                        <p>Like by <strong>{postData?.likedBy[0]} </strong> <strong> {postData?.likes} </strong> </p>
                    </div>
                    <p>
                        {post.caption}
                    </p>
                    {/*  <span className='text-slate-500 text-sm'>Show all the 164 comments</span> */}
                    <p className='mt-2 text-slate-600 text-xs uppercase'>{timeAgo}</p>
                </div>
            </div>
            <div className='w-full flex mb-2'>
                <form className='flex w-full' onSubmit={handleComment}>
                    <input className='w-full' value={formData.comment} name='comment' onChange={(e) => setFormData((preFormData) => ({ ...preFormData, [e.target.name]: e.target.value }))} type="text" placeholder='Add a commit...' />
                    <button type='submit' className='text-blue-400'>Post</button>
                </form>
            </div>
            {more && <PostMoreMenu post={postData} setMore={setMore} user={user} />}
        </div>
    )
}

export default PostDetail