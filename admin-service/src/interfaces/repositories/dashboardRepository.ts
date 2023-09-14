import { Op, Sequelize, col, fn } from "sequelize";
import userModel from "../../frameworks/sequelize/models/userModel";
import { User } from "../../entities/userEntity";
import postModel from "../../frameworks/sequelize/models/postModel";
import notificationModel from "../../frameworks/sequelize/models/notificationModel";

class DashboardRepository {
    private userModel
    private postModel
    private notificationModel
    constructor(sequelize: Sequelize) {
        this.userModel = userModel(sequelize)
        this.postModel = postModel(sequelize)
        this.notificationModel = notificationModel(sequelize)
    }

    async getUsers(type: string, target: string) {

        try {
            if (type == 'day') {
                const currentDate = new Date().toISOString().split('T')[0]
                const whereClause = {
                    createdAt: {
                        [Op.between]: [`${currentDate} 00:00:00`, `${currentDate} 23:59:59`],
                    },
                } as unknown as Record<string, any>;

                return await this.userModel.count({ where: whereClause });
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

                    const users: any = await this.userModel.count({ where: whereClause });


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

                    const users: any = await this.userModel.count({ where: whereClause });


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

                    const users: any = await this.userModel.count({ where: whereClause });


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
    async getPostReports(type: string, target: string) {

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

    async getPopularUsers() {
        try {
            
            return await this.userModel.findAll({
                order: [[fn('json_array_length', col('followers')), 'DESC']],
              limit:6});
        } catch (err) {
            throw err
        }


    }
    async getNotifications() {
        try {

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

                const users: any = await this.postModel.findAll({ where: whereClause ,order:[["createdAt","DESC"]]});


                dailyUserDetails[day] = users;

            }
            
            return dailyUserDetails
        } catch (err) {
            throw err
        }


    }
}
export default DashboardRepository
