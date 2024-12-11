import { Injectable } from "@nestjs/common";
import { sortByValues, Task, TaskQueryDto, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS
    }
  ];

  getFilteredTasks(query: TaskQueryDto): Task[] {
    const { status, page, limit, sortBy } = query;
    let result = status ? this.tasks.filter((task: Task) => task.status === status) : this.tasks;
    if (page || limit) {
      result = this.makePagination(result, page, limit);
    }
    if (sortBy) {
      result = this.makeSorting(result, sortBy);
    }
    return result;
  }

  private makePagination(data: Array<any>, page: number = 1, limit: number = 1) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return data.length >= start ? data.slice(start, end) : [];
  }

  private makeSorting(tasks: Task[], sortField: sortByValues) {
    return tasks.sort((a, b) => a[sortField].localeCompare(b[sortField]));
  }
}
