import { IsEnum, IsIn, IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer";

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

export type sortByValues = "title" | "description" | "status";

export class TaskQueryDto {
  @IsOptional()
  @IsEnum(TaskStatus, { each: true })
  status: TaskStatus.PENDING | TaskStatus.IN_PROGRESS | TaskStatus.COMPLETED;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsIn(["title", "description", "status"])
  sortBy: sortByValues;
}