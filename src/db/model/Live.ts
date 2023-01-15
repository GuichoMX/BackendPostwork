import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize"
import { sequelize } from ".."

export default class Live extends Model<InferAttributes<Live>, InferCreationAttributes<Live>>{
    declare liveId: number
    declare title: string
    declare author: string
    declare category: string
}

Live.init({
    liveId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize
}); 