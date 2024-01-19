import { Sequelize } from 'sequelize';
import config from './config.js';


const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password, {
  host: config.host,
  // one of our supported dialects:
  // 'mysql', 'mariadb', 'postgres', 'mssql', 'sqlite', 'snowflake', 'db2' or 'ibmi'
  dialect: config.dialect
});

export default sequelize