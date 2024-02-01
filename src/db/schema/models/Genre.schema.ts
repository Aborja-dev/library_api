import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config";

export class Genre extends Model { }

Genre.init({
    name: DataTypes.STRING
}, {
    sequelize: sequelize,
    tableName: 'genre',
    timestamps: false
}
)