import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, Task, UpdateTaskDto } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task as Task);
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() task: UpdateTaskDto) {
    return this.tasksService.updateTask(id, task as Task);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    return this.tasksService.deleteTask(id);
  }
}
