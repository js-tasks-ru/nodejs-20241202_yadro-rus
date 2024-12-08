import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus } from "./task.model";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private id: number = 0;

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) throw new NotFoundException();
    return task;
  }

  createTask(task: Task): Task {
    task.id = (++this.id).toString();
    task.status ??= TaskStatus.PENDING;
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, update: Task): Task {
    if (!Object.keys(update).length)
      throw new HttpException("No fields to update", HttpStatus.BAD_REQUEST);
    const index = this._getTaskDBIndex(id);
    if (index === -1) throw new NotFoundException();
    this.tasks[index] = { ...this.tasks[index], ...update };
    return this.tasks[index];
  }

  deleteTask(id: string): Task {
    const index = this._getTaskDBIndex(id);
    if (index === -1) throw new NotFoundException();
    const taskToRemove = this.tasks[index];
    this.tasks.splice(index, 1);
    return taskToRemove;
  }

  private _getTaskDBIndex(id: string): number {
    return this.tasks.findIndex((task) => task.id === id);
  }
}
