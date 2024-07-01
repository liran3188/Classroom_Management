import { Column, Model, Table, CreatedAt, UpdatedAt, DataType } from 'sequelize-typescript';

@Table({tableName: "classrooms", underscored: true,  timestamps: true})
export class Classrooms extends Model<Classrooms>{
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;
  
    @Column({type: DataType.STRING})
    name: string;
  
    @Column({type: DataType.INTEGER})
    capacity: number;

    @CreatedAt
    createdAt: Date; // Define created_at column

    @UpdatedAt
    updatedAt: Date;

    // constructor(id?: number, name?: string, capacity?: number) {
    //   super();
    //   if (id !== undefined && name !== undefined && capacity !== undefined) {
    //     this.id = id;
    //     this.name = name;
    //     this.capacity = capacity;
    //   }
    // }
}