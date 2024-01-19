import { Sequelize } from 'sequelize';
import config from './config.js';


const sequelize = new Sequelize(
  'library_app',
  'root',
  '1234', {
  host: 'localhost',
  // one of our supported dialects:
  // 'mysql', 'mariadb', 'postgres', 'mssql', 'sqlite', 'snowflake', 'db2' or 'ibmi'
  dialect: 'mysql'
});

export default sequelize