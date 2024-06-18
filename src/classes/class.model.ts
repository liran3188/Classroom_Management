import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class classrooms extends Model<classrooms>{
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;
  
    @Column
    name: string;
  
    @Column
    capacity: number;

    constructor(id?: number, name?: string, capacity?: number) {
      super();
      if (id !== undefined && name !== undefined && capacity !== undefined) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
      }
    }
}
