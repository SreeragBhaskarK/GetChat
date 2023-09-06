import { Sequelize } from "sequelize";
const { AWS_RDS_USER, AWS_RDS_PASSWORD, AWS_RDS_DB, AWS_RDS_URL } = process.env
export const sequelize = new Sequelize( AWS_RDS_DB!,AWS_RDS_USER!,AWS_RDS_PASSWORD!, {
    host: AWS_RDS_URL,
    dialect: 'postgres'
});
// Test the connection
async function test() {

    try {
        console.log(AWS_RDS_DB,'db');
        await sequelize.sync()
        await sequelize.authenticate();
        console.log('GetChat Admin Serive DB Ready');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


export default test
