import { sequelize } from './config';
import { Entities } from './schema';
import { ConecctionConfig } from './types/types';
Entities
export const createConnection = async ({force}: ConecctionConfig = {force: false}) => {
    try {
        return await sequelize.sync({force});
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
