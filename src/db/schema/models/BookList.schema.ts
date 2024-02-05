import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config";
import { List } from "./List.schema";
import { Book } from "./Book.schema";

export class BookList extends Model {}

BookList.init(
    {
        ListId: {
            type: DataTypes.INTEGER,
            references: {
                model: List,
                key: 'id'
            }
        },
        BookId: {
            type: DataTypes.INTEGER,
            references: {
                model: Book,
                key: 'id'
            }
        },
        status: {
         type: DataTypes.ENUM('por leer', 'terminado', 'favorito')   ,
         defaultValue: 'por leer'
        }
    },{
        sequelize: sequelize,
        tableName: 'book_list',
        timestamps: false
    })