import { sequelize } from './config';
import { Entities } from './schema';
import { seed } from '@seed/index';
import { ConecctionConfig } from './types/types';
Entities
type DBParams = {
  seedDB: boolean
}
export const startDB = async ({seedDB = false}: DBParams) => {
  const force = seedDB ? true : false
  try {
    await sequelize.sync({force})
    console.log('Connection has been established successfully.');
    if (seedDB) {
      await seed()
    }
    return sequelize
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
