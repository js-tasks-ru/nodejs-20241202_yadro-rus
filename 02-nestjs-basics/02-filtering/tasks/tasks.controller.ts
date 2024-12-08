import { Controller, Get, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskQueryDto } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Get()
  getTasks(@Query() taskQueryDto: TaskQueryDto) {
    return this.tasksService.getFilteredTasks(taskQueryDto);
  }
}
