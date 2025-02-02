import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, UseGuards, UseInterceptors
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, UpdateTaskDto } from "./task.model";
import { ParseIntPipe } from "../pipes/parse-int.pipe";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "../guards/roles.decorator";
import { ApiVersionInterceptor } from "../interceptors/api-version.interceptor";


@Controller("tasks")
@UseInterceptors(ApiVersionInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Get()
  async getAllTasks() {
    // await new Promise((r)=> setTimeout(r,5000));
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(["admin", "superAdmin"])
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  updateTask(
    @Param("id", ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto
  ) {
    return this.tasksService.updateTask(id, task);
  }

  @Delete(":id")
  @UseGuards(RolesGuard)
  @Roles(["admin", "superAdmin"])
  deleteTask(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
