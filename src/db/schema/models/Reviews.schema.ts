import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config";
import { IReviewModel } from "../../types/types";

export class Review extends Model implements IReviewModel {
    rate!: number;
    comment!: string;
    created_at!: number;
    unique!: string;
}

Review.init({
    rate: {
        type: DataTypes.DECIMAL(3,1),
        allowNull: false,
        defaultValue: 5.0
    },
    comment: DataTypes.TEXT,
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    unique: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    }
},{
    sequelize: sequelize,
    tableName: 'Review',
    timestamps: false
})