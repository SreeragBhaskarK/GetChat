import { Sequelize } from "sequelize";
const { AWS_RDS_USER, AWS_RDS_PASSWORD, AWS_RDS_DB, AWS_RDS_URL } = process.env
export const sequelize = new Sequelize( AWS_RDS_DB!,AWS_RDS_USER!,AWS_RDS_PASSWORD!, {
    host: AWS_RDS_URL,
    dialect: 'postgres'
});
// Test the connection
async function test() {

    try {
        await sequelize.sync()
        console.log('GetChat Admin Serive DB Ready');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


test()
