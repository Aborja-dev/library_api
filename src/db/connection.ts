import { Sequelize } from 'sequelize';


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('library_app', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
})

export const createConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
