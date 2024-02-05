import { Model, DataTypes} from "sequelize";
import { sequelize } from "../../config";

export class List extends Model {}

List.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
} , {
    sequelize: sequelize,
    tableName: 'List',
})