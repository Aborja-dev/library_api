import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config";
import { IBookModel } from "../../types/types";

export class Book extends Model implements IBookModel{
    title!: string;
    author!: string;
    pages!: number;
    summary!: string;
    rating!: number;
    created_at!: Date;
}

Book.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pages: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    summary: {
        type: DataTypes.TEXT
    },
    rate: {
        type: DataTypes.DECIMAL(3,1)
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    }
}, {
    sequelize: sequelize,
    tableName: 'Book',
    timestamps: false
})