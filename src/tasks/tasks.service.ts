import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTaskByTitle(title: string): Task {
  //   const task = this.tasks.find((task) => task.title === title);
  //   if (!task) {
  //     throw new NotFoundException(`Task with title ${title} not found`);
  //   }
  //   return task;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   // define a tempory result[]
  //   let tasks = this.getAllTasks();
  //   // do something with status
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   // do something with search
  //   if (search) {
  //     tasks = tasks.filter((task) =>
  //       task.title.includes(search) || task.description.includes(search)
  //         ? true
  //         : false,
  //     );
  //   }
  //   // return final result
  //   return tasks;
  // }
  // createTasks(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // updateTask(title: string, status: TaskStatus): Task {
  //   const task = this.getTaskByTitle(title);
  //   task.status = status;
  //   return task;
  // }
  // removeTaskByTitle(title: string) {
  //   const task = this.getTaskByTitle(title);
  //   this.tasks = this.tasks.filter((task) => task.title !== title);
  // }
}
