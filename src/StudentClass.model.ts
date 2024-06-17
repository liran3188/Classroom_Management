import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class StudentClass extends Model<StudentClass>{
    @Column({ primaryKey: true, autoIncrement: true })
    studentId: number;

    @Column({ primaryKey: true, autoIncrement: true })
    classId: number;
  
    constructor(studentId?: number, classId?: number) {
        super();
        if (studentId !== undefined && classId !== undefined) {
          this.studentId = studentId;
          this.classId = classId;
        }
    }
}
