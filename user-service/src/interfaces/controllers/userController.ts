import { Request, Response } from "express"
import userModel from "../../frameworks/mongoose/models/userModel"
import GetUser from "../../useCases/userUseCase/getUser"
import UserRepository from "../repositories/userRepository"
import { User } from "../../entities/userEntity"
import UpdateUser from "../../useCases/userUseCase/updateUser"
import SearchUser from "../../useCases/userUseCase/searchUser"
import FollowUser from "../../useCases/userUseCase/followUser"
import UnFollowUser from "../../useCases/userUseCase/unFollowUser"
import messageModel from "../../frameworks/mongoose/models/messageModel"
import GetMessages from "../../useCases/userUseCase/getMessages"
import GetChatUser from "../../useCases/chat/getChatUser"
import ChatRepository from "../repositories/chatRepository"
import chatModel from "../../frameworks/mongoose/models/chatModel"
import CreateUser from "../../useCases/userUseCase/createUser"
import CreateChatUser from "../../useCases/chat/createChatUser"
import ChangeSeen from "../../useCases/chat/changeSeen"
import GetFollowData from "../../useCases/userUseCase/getFollowData"
import DeleteMessage from "../../useCases/chat/deleteMessage"
import DeleteChat from "../../useCases/chat/deleteChat"
import getNotifications from "../../useCases/notifications/getNotifications"
import NotificationRepository from "../repositories/notificationRepository"
import GetNotifications from "../../useCases/notifications/getNotifications"
import notificationModel from "../../frameworks/mongoose/models/notificationModel"
import RemoveFollowers from "../../useCases/userUseCase/removeFollowers"
import GetAdvertising from "../../useCases/userUseCase/getAdvertising"
import AdvertisingRepository from "../repositories/advertisingRepository"
import advertisingModel from "../../frameworks/mongoose/models/advertisingModel"
import sanitize from "mongo-sanitize"
import DeleteNotification from "../../useCases/notifications/deleteNotification"
import GetSuggestion from "../../useCases/userUseCase/getSuggestion"

const userRepository = new UserRepository(userModel, messageModel)
const chatRepository = new ChatRepository(chatModel, messageModel)
const notificationRepository = new NotificationRepository(notificationModel)
const advertisingRepository = new AdvertisingRepository(advertisingModel)
class UserController {

    static async getUser(req: Request, res: Response) {
        try {
            console.log(req.body, '///////////');

            const { username } = await sanitize(req.body) 
            if (!username) throw new Error("not found user name");
            new Error('not found username')
            const getUser = new GetUser(userRepository)
            const result: any = await getUser.execute(username)
            console.log(result, '//////');

            if (result) {
                result.password = undefined
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }

    static async updateUserData(req: Request, res: Response) {
        try {
            console.log('🔥🔥🔥');
            console.log(req.body, '///////////');
            console.log('🔥🔥🔥');

            const { username, bio, gender, profilePic } = await sanitize(req.body) 
            if (!username || !bio || !gender) throw new Error("not found user name");

            const updateUser = new UpdateUser(userRepository);

            const result: any = await updateUser.execute(username, bio, gender, profilePic);

            console.log(result, '//////');

            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async searchUser(req: Request, res: Response) {
        try {

            const { search, username } = await sanitize(req.query)  as { search: string, username: string }
            if (!search || !username) throw new Error("not found search key");

            const searchUser = new SearchUser(userRepository);

            const result: any = await searchUser.execute(search, username);

            console.log(result, '//////');

            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async followUser(req: Request, res: Response) {
        try {
            console.log(req.body);

            const { followUserName, user } = await sanitize(req.body) 
            if (!followUserName || !user) throw new Error("not found follow id or user id");

            const followUser = new FollowUser(userRepository);

            const result: any = await followUser.execute(followUserName, user);

            console.log(result, '//////');

            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async unFollowUser(req: Request, res: Response) {
        try {
            console.log(req.body);

            const { followUserName, user } = await sanitize(req.body) 
            if (!followUserName || !user) throw new Error("not found unfollow id or user id");

            const unFollowUser = new UnFollowUser(userRepository);

            const result: any = await unFollowUser.execute(followUserName, user);

            console.log(result, '//////');

            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async getMessages(req: Request, res: Response) {
        try {

            const { chatId,page } = await sanitize(req.body) 

            if (!chatId||!page) throw new Error("not found chat id");
            const pageNumber = Number(page)
            const getMessages = new GetMessages(userRepository);

            const result: any = await getMessages.execute(chatId,pageNumber);

            console.log(result, '//////');

            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }

    static async getChatUser(req: Request, res: Response) {
        try {
            console.log(req.params, '/////');

            const { userId } = await sanitize(req.params) 
            const getChatUser = new GetChatUser(chatRepository)
            const result = await getChatUser.execute(userId)
            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async createChat(req: Request, res: Response) {
        try {
            const { firstId, secondId } = await sanitize(req.body) 
            if (!firstId || !secondId) throw new Error('id is missing')
            const createChatUser = new CreateChatUser(chatRepository)
            const result = await createChatUser.execute(firstId, secondId)


            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async changeSeen(req: Request, res: Response) {
        try {
            const { messageId } = await sanitize(req.body) 
            if (!messageId) throw new Error('id is missing')
            const changeSeen = new ChangeSeen(chatRepository)
            const result = await changeSeen.execute(messageId)


            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async getFollows(req: Request, res: Response) {
        try {
            const { userId, type } = await sanitize(req.body) 
            console.log(req.body);

            if (!userId || !type) throw new Error('id or type is missing')
            const getFollowData = new GetFollowData(userRepository)
            const result = await getFollowData.execute(userId, type)


            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async deleteMessage(req: Request, res: Response) {
        try {
            const { id,userId } = await sanitize(req.params)  as { id: string,userId:string }
            console.log(req.body);

            if (!id||!userId) throw new Error('id  is missing')
            const deleteMessage = new DeleteMessage(chatRepository)
            const result = await deleteMessage.execute(id,userId)


            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async deleteChat(req: Request, res: Response) {
        try {
            const { id,userId } = await sanitize(req.params)  as { id: string,userId:string }
            console.log(req.body);

            if (!id||!userId) throw new Error('id  is missing')
            const deleteChat = new DeleteChat(chatRepository)
            const result = await deleteChat.execute(id,userId)


            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async getNotifications(req: Request, res: Response) {
        try {
            const { username } = await sanitize(req.query)  as { username: string }
            if (!username) throw new Error('username is missing')
            const getNotifications = new GetNotifications(notificationRepository)
            const result = await getNotifications.execute(username)

            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async removeFollow(req: Request, res: Response) {
        try {
            const { followersUsername, followingUsername } = await sanitize(req.body) 
            if (!followersUsername || !followingUsername) throw new Error('username is missing')
            const removeFollow = new RemoveFollowers(userRepository)
            const result = await removeFollow.execute(followersUsername, followingUsername)

            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async getAdvertising(req: Request, res: Response) {
        try {

            const { type,page } = await sanitize(req.query)  as { type: string,page:string }

            const getAdvertising = new GetAdvertising(advertisingRepository)
            const result = await getAdvertising.execute(type,page)

            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async deleteNotifications(req: Request, res: Response) {
        try {

            const { id,username } = await sanitize(req.query)  as { id: string,username:string }
            if(!id||!username)throw new Error('missing for id and username')
            const deleteNotification = new DeleteNotification(notificationRepository)
            const result = await deleteNotification.execute(id,username)

            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async getSuggestion(req: Request, res: Response) {
        try {

            const { username } = await sanitize(req.query)  as { username:string }
            if(!username)throw new Error('missing for username')
            const getSuggestion = new GetSuggestion(userRepository)
            const result = await getSuggestion.execute(username)

            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }






}
export default UserController