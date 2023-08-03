import { Sequelize } from 'sequelize'
const { AWS_RDS_USER, AWS_RDS_PASSWORD, AWS_RDS_DB, AWS_RDS_URL, AWS_RDS_PORT } = process.env

export const sequelize = new Sequelize({
    database: AWS_RDS_DB,
    username: AWS_RDS_USER,
    password: AWS_RDS_PASSWORD,
    host: AWS_RDS_URL,
    dialect: 'postgres'
})

async function connect() {
    try {

        await sequelize.authenticate();
        console.log('GetChat Post Serive DB Ready');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}
export default connect