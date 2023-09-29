import mongoose from "mongoose"
import userModel from "../../frameworks/mongoose/models/userModel"

const ObjectId = mongoose.Types.ObjectId
class UserRepository {

    constructor(private userModel: any, private messageModel: any) {
        this.userModel = userModel
        this.messageModel = messageModel
    }
    async getUser(username: string) {
        try {
            const userData = await this.userModel.findOne({ username })
            return userData
        } catch (err) {
            throw err

        }
    }
    async updateUser(username: string, bio: string, gender: string, profilePic: string) {
        try {
            console.log(username, bio, gender);
            if (profilePic) return await this.userModel.findOneAndUpdate({ username }, { $set: { bio, gender, profile_pic: profilePic } }, { new: true })
            return await this.userModel.findOneAndUpdate({ username }, { $set: { bio, gender } }, { new: true })

        } catch (err) {
            throw err

        }
    }
    async searchUser(key: string, username: string) {
        try {

            return await this.userModel.find({
                $and: [
                    { username: { $regex: key, $options: 'i' } },
                    { username: { $ne: username } }
                ]
            }).limit(5);


        } catch (err) {
            throw err

        }
    }

    async followUser(followUserName: string, user: string) {
        try {
            const result = await this.userModel.findOne({ $and: [{ username: user }, { following: followUserName }] })
            console.log(result, '//////user////');

            if (result) throw new Error('already following user')
            await this.userModel.findOneAndUpdate({ username: followUserName }, {
                $push: {
                    followers: user
                }
            })
            return await this.userModel.findOneAndUpdate({ username: user }, {
                $push: {
                    following: followUserName
                }
            }, { new: true })

        } catch (err) {
            throw err

        }
    }
    async unFollowUser(followUserName: string, user: string) {
        try {
            const result = await this.userModel.find({ username: user, following: followUserName })
            if (!result) throw new Error('already unfollowing user')
            await this.userModel.findOneAndUpdate({ username: followUserName }, {
                $pull: {
                    followers: user
                }
            })
            return await this.userModel.findOneAndUpdate({ username: user }, {
                $pull: {
                    following: followUserName
                }
            }, { new: true })

        } catch (err) {
            throw err

        }
    }

    async getMessages(chatId: string) {
        try {
            /*  const result = await this.messageModel.aggregate([{
                 $match: {
                     $or: [{ senderId: new ObjectId(userId) }, { recipientId: new ObjectId(userId) }]
                 }
             }, {
                 $lookup: {
                     from: 'users',
                     localField: 'senderId',
                     foreignField: '_id',
                     as: 'sender'
                 }
             }, {
                 $lookup: {
                     from: 'users',
                     localField: 'recipientId',
                     foreignField: '_id',
                     as: 'recipient'
                 }
             }, {
                 $sort: { createdAt: -1 }
             }, {
                 $limit: 10
             }]) */
            let result = await this.messageModel.find({ chatId }).sort({ createdAt: -1 }).limit(50)
            result = result.slice().reverse()

            return result

        } catch (err) {
            throw err

        }
    }

    async getFollowData(userId: string, type: string) {
        try {
            const userData = await this.userModel.findOne({ _id: userId })
            if (!userData) throw new Error('invaild user id')
            if (type === 'following') {

                return await this.userModel.find({ username: { $in: userData.following } })
            } else {
                return await this.userModel.find({ username: { $in: userData.followers } })

            }



        } catch (err) {
            throw err
        }
    }
    async removeFollow(followersUsername: string, followingUsername: string) {
        try {
            const followers = await this.userModel.updateOne({ username: followersUsername }, {
                $pull: {
                    following: followingUsername
                }
            })

            return await this.userModel.findOneAndUpdate({ username: followingUsername }, {
                $pull: {
                    followers: followersUsername
                }
            }, { new: true })

        } catch (err) {
            throw err
        }
    }

    async getSuggestion(username: string) {
        try {
            const users = await this.userModel.findOne({ username })
            const followingUsers = await this.userModel.find({ username: { $in: users?.following, $ne: username } })
            console.log(followingUsers, users, 'one');
            if (followingUsers.length) {


                return await this.userModel.find({
                    $and: [
                        { $or: followingUsers.map((user: any) => ({ username: user.following })) },
                        { username: { $ne: username } }, // Exclude the current user
                        { username: { $nin: users.following } }, // Exclude the current user
                        // Exclude users in the 'following' array
                    ]
                });

            }else{
                return []
            }



            /*     return await this.userModel.find({ username: { $nin: users?.following, $ne: username } }).sort({ createdAt: -1 }).limit(20) */


        } catch (err) {
            throw err

        }
    }
}

export default UserRepository