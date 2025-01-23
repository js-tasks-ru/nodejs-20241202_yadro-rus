import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { GetTasksDto } from "./dto/get-tasks.dto";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    await this.taskRepository.save(task);
    return task;
  }

  async findAll(getTasksDto: GetTasksDto) {
    const { page, limit } = getTasksDto;
    if (page || limit) {
      return this.findAllWithPagination(page, limit);
    }
    return this.taskRepository.find();
  }

  private findAllWithPagination(page: number = 1, limit: number = 1) {
    const start = (page - 1) * limit;
    return this.taskRepository.find({
      skip: start,
      take: limit
    });
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    await this.taskRepository.save(task);
    return task;
  }

  async remove(id: number): Promise<any> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
    return {
      "message": `Task ${id} deleted successfully `
    };
  }
}
