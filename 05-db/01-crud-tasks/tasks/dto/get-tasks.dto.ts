import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class GetTasksDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
