import { Sequelize } from 'sequelize';

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize('library_app', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  timezone: 'America/Mexico_City',
  logging: false
})