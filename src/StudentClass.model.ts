import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class studentclass extends Model<studentclass>{
    @Column({ primaryKey: true })
    studentId: number;

    @Column({ primaryKey: true })
    classId: number;
  
    constructor(studentId?: number, classId?: number) {
        super();
        if (studentId !== undefined && classId !== undefined) {
          this.studentId = studentId;
          this.classId = classId;
        }
    }
}
