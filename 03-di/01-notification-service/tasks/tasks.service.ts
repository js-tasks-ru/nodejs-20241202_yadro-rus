import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { NotificationService } from "../providers/NotificationService";
import { UsersService } from "../users/users.service";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(private readonly notificationService: NotificationService,
              private readonly usersService: UsersService) {
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;
    const user = this.usersService.getUserById(assignedTo);

    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo
    };
    this.tasks.push(task);

    await this.notificationService.sendEmail(user.email, "Новая задача", `Вы назначены ответственным за задачу: "${title}"`);

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    const user = this.usersService.getUserById(task.assignedTo);

    Object.assign(task, updateTaskDto);

    await this.notificationService.sendSMS(user.phone, `Статус задачи "${task.title}" обновлён на "${task.status}"`);

    return task;
  }
}
