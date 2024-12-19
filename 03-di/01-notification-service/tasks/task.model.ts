import { IsString, IsNotEmpty, IsIn, IsNumber } from "class-validator";
import { OmitType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";

export enum TaskStatus {
  Pending = "pending",
  InProgress = "in_progress",
  Completed = "completed",
}

export class Task {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;

  @IsNumber()
  @Type(()=> Number)
  assignedTo?: number;
}

export class CreateTaskDto extends PickType(Task, [
  "title",
  "description",
  "assignedTo",
]) {}
export class UpdateTaskDto extends PickType(Task, [
  "title",
  "description",
  "status",
]) {}
