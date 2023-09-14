import { Sequelize, Op } from "sequelize"
import postModel from "../../frameworks/sequelize/models/postModel"
import { postProducer } from "../messageBrokers/postProducer"
import { sequelize } from "../../config/connection"
import { deleteObject } from "../../utils/s3"
import { Post } from "../../entities/postEntity"
import { commentModel } from "../../frameworks/sequelize/models/commentModel"

class PostRepository {
    private postModel
    constructor(sequelize: Sequelize) {
        this.postModel = postModel(sequelize)
    }
    async getPosts(page: number, username: any, type: string) {
        try {
            console.log(username, page, '/////////post',type);

            if (type == 'home') {
                return await this.postModel.findAll({ where: { username: username },order:[["createdAt","DESC"]], offset: (page - 1) * 5, limit: 5 })
                
            } else {
                console.log(username.username,'username', '////',username.following);
                
                return await this.postModel.findAll({ where: {
                    [Op.and]: [
                        { username: { [Op.ne]: username.username } },
                        { username: { [Op.notIn]: username.following } }
                    ]
                }, offset: (page - 1) * 5, limit: 5 })
                
            }
        } catch (err) {
            throw err

        }
    }

    async addPost(url: string, username: string, caption: string) {
        try {

            const result: any = await this.postModel.create({
                username: username,
                post_url: url,
                caption: caption
            })

            console.log('/', result.dataValues.id, '///url');
            /*  await postProducer({ id: result?.dataValues.id, username: result?.dataValues.username }, 'addPostInUser', "insertPost").catch(async (err) => {
                 await deleteObject(result.dataValues.post_url)
                 const deleteobj = await this.postModel.destroy({ where: { id: result.dataValues.id } })
                 console.log(deleteobj, '///////delete');
 
                 throw err
 
             }) */
            return result.dataValues

        } catch (err) {
            throw err
        }
    }

    async likePost(id: string, username: string) {
        try {
            const existingPost = await this.postModel.findOne({ where: { id: id, likedBy: { [Op.contains]: [username] } } });
            if (!existingPost) {

                const result: any = await this.postModel.update({ likedBy: sequelize.fn('array_append', sequelize.col('likedBy'), username), likes: sequelize.literal('likes + 1') }, { where: { id: id } as any, returning: true })
                return result[1]
            } else {
                return false
            }
        } catch (err) {
            throw err

        }
    }
    async unLikePost(id: number, username: string) {
        try {
            const existingPost = await this.postModel.findOne({ where: { id: id, likedBy: { [Op.contains]: [username] } } });
            if (existingPost) {

                const result: any = await this.postModel.update(
                    {
                        likedBy: sequelize.fn('array_remove', sequelize.col('likedBy'), username),
                        likes: sequelize.literal('likes - 1')
                    },
                    { where: { id: id }, returning: true }
                );
                return result[1]
            } else {
                return false
            }
        } catch (err) {
            throw err

        }
    }

    async getPost(id: string) {
        try {

            const result = await this.postModel.findOne({ where: { id: id } })
            console.log(result);
            return result

        } catch (err) {
            throw err

        }
    }
    async getPostDetails(username: string, page: number) {
        try {

            const result = await this.postModel.findAll({ where: { username }, offset: (page - 1) * 9, limit: 9, order: [['createdAt', 'DESC']] })
            console.log(result);
            return result

        } catch (err) {
            throw err

        }
    }


    async editPost(id: string, caption: string) {
        try {

            const result = await this.postModel.update({ caption }, { where: { id }, returning: true })
            return result[1]
        } catch (err) {
            throw err

        }
    }

    async deletePost(id: string) {
        try {
            const post = await this.postModel.findOne({ where: { id } })
            if (!post) throw new Error('invalid post id')
            const result = await this.postModel.destroy({ where: { id } })
            console.log(result, '//////');

            await deleteObject(post.post_url)
            return true
        } catch (err) {
            throw err
        }
    }

    async deleteComment(id: string, comment: string) {
        try {

            /* const result =await this.postModel.update({comments:sequelize.fn('array_remove',sequelize.col('comments'),comment)},{where:{id},returning:true})
            return result[1] */
            return true
        } catch (err) {
            throw err

        }
    }


    async getPostDashboard(type: string, target: string) {

        try {
            if (type == 'day') {
                const currentDate = new Date().toISOString().split('T')[0]
                const whereClause = {
                    createdAt: {
                        [Op.between]: [`${currentDate} 00:00:00`, `${currentDate} 23:59:59`],
                    },
                } as unknown as Record<string, any>;

                return await this.postModel.count({ where: whereClause });
            } else if (type == 'week') {
                const currentDate = new Date();
                const currentDayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
                const currentWeekStartDate = new Date(currentDate);
                const dailyUserDetails: any = {};
                currentWeekStartDate.setDate(currentDate.getDate() - currentDayOfWeek);
                for (let day = 0; day <= 6; day++) {
                    const startDate = new Date(currentWeekStartDate);
                    startDate.setDate(currentWeekStartDate.getDate() + day);

                    const endDate = new Date(startDate);
                    endDate.setDate(startDate.getDate() + 1);

                    const whereClause = {
                        createdAt: {
                            [Op.between]: [startDate, endDate],
                        },
                    } as unknown as Record<string, any>;

                    const users: any = await this.postModel.count({ where: whereClause });


                    dailyUserDetails[day] = users;

                }

                return dailyUserDetails




            } else if (type == 'month') {
                const currentYear: number = Number(target)
                let monthlyUserDetails: any = []
                for (let month = 1; month <= 12; month++) {
                    // Create the start and end date for the current month
                    const startDate = new Date(currentYear, month - 1, 1);
                    const endDate = new Date(currentYear, month, 0);

                    const whereClause = {
                        createdAt: {
                            [Op.between]: [startDate, endDate],
                        },
                    } as unknown as Record<string, any>;

                    const users: any = await this.postModel.count({ where: whereClause });


                    monthlyUserDetails.push({ month, users });

                    // Check if we have retrieved data for all 12 months
                    if (monthlyUserDetails.length === 12) {
                        console.log(monthlyUserDetails);
                    }

                }

                return monthlyUserDetails




            } else if (type == 'year') {
                const limit = Number(target)
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const yearlyUserDetails: any = {};

                // Create queries for the current year and the previous 5 years
                for (let i = 0; i < limit; i++) {
                    const year = currentYear - i;
                    const startDate = new Date(year, 0, 1);
                    const endDate = new Date(year, 11, 31);

                    const whereClause = {
                        createdAt: {
                            [Op.between]: [startDate, endDate],
                        },
                    } as unknown as Record<string, any>;

                    const users: any = await this.postModel.count({ where: whereClause });


                    yearlyUserDetails[year] = users;

                }

                return yearlyUserDetails;
            } else {
                throw new Error('wrong day')

            }

        } catch (err) {
            throw err

        }

    }


}

export default PostRepository