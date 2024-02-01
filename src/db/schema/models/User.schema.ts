import { UserModel } from '../../types/types';
import { sequelize } from '../../config';
import { Model, DataTypes } from 'sequelize';


export class User extends Model implements UserModel {
  username!: string;
  password!: string;
  name!: string;
  news!: boolean;
  frequency!: number;

}

User.init({
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  news: {
    type: DataTypes.BOOLEAN
  },
  frequency: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize: sequelize,
  tableName: 'User',
  timestamps: false
})
