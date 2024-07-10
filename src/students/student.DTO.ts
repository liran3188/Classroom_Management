import { IsString, IsInt, IsOptional, Min, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsInt()
  @IsOptional()
  id?: number; // Optional field for ID, generally auto-generated by the database

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  occupation: string;
}

export class StudentDto {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    occupation: string;
    createdAt: Date;
    updatedAt: Date;
  }