import { Column, Model, Table, CreatedAt, UpdatedAt, DataType } from 'sequelize-typescript';

@Table({tableName: "classrooms", underscored: true,  timestamps: true})
export class Classroom extends Model<Classroom>{
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;
  
    @Column({type: DataType.STRING})
    name: string;
  
    @Column({type: DataType.INTEGER})
    capacity: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}