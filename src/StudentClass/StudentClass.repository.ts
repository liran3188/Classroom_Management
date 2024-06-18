import { Inject, Injectable } from '@nestjs/common';
import { studentclass } from 'src/StudentClass/StudentClass.model';

@Injectable()
export class StudentClassRepository {
    studentClassModel: any;
    constructor(
        @Inject("STUDENT_CLASS") studentClassModel: studentclass
    ) { }

    async getClasses(id: number): Promise<studentclass[]> {
        return this.studentClassModel.findAll({ where: { studentId: id } });
    }

    async deleteStudentConnection(id: number): Promise<number> {
        const deletedRows = await this.studentClassModel.destroy({ where: { studentId: id } });
        return deletedRows;
    }

    async addStudent(studentId, classId) {
        const data = new studentclass(studentId, classId)
        return this.studentClassModel.create(data)
    }

    async getStudents(id: number): Promise<studentclass[]> {
        return this.studentClassModel.findAll({ where: { classId: id } })
        // const query = `SELECT student_id FROM public.student_classes WHERE class_id = ${id}`;
        // return db.query(query, { type: sequelize.QueryTypes.SELECT })
        // .then(results => {
        //   return (results);
        // })
    }

    async deleteClassConnection(id: number): Promise<number> {
        const deletedRows = await this.studentClassModel.destroy({ where: { classId: id } });
        return deletedRows;
    }

    async removeStudent(studentId, classId): Promise<number> {
        const deletedRows = await this.studentClassModel.destroy({ where: { classId: classId, studentId: studentId } });
        return deletedRows;
    }
}