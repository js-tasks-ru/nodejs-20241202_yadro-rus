import { IsNotEmpty, IsOptional } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  status: TaskStatus;
}


export class UpdateTaskDto extends PartialType(CreateTaskDto) {
}