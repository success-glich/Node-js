import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";

export const enum BlogStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED",

}
export interface IBlog {
    id?: number;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table
export class Blog extends Model<IBlog> {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    title!: string;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT,
    })
    content!: string;

    @AllowNull(false)
    @Default(BlogStatus.DRAFT)
    @Column({
        type: DataType.STRING,
    })
    status!: BlogStatus


    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt!: Date;
}
