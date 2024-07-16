import { Column, Model, Table, CreatedAt, UpdatedAt, DataType } from 'sequelize-typescript';

@Table({tableName: "students", underscored: true,  timestamps: true})
export class Student extends Model<Student> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;
  
    @Column({type: DataType.STRING})
    firstName: string;
  
    @Column({type: DataType.STRING})
    lastName: string;

    @Column({type: DataType.INTEGER})
    age: number;

    @Column({type: DataType.STRING})
    occupation: string;

    @Column({type: DataType.INTEGER})
    class: number

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}