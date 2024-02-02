import { Model, DataTypes} from "sequelize";
import { sequelize } from "../../config";

export class List extends Model {}

List.init({
    
} , {
    sequelize: sequelize,
    tableName: 'List',
    timestamps: false
})