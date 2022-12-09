import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // if we have any filters defined, call tasksService.getTasksWithFilters
    if (Object.keys(filterDto).length) {
      // run function
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    // otherwise, just get all tasks
    return this.tasksService.getAllTasks();
  }

  @Get(':title')
  getOneTask(@Param('title') title: string): Task | string {
    return this.tasksService.getTaskByTitle(title);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    const task = this.tasksService.createTasks(createTaskDto);
    return task;
  }

  @Patch(':title/status')
  updateTask(
    @Param('title') title: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTask(title, status);
  }

  @Delete(':title')
  removesTask(@Param('title') title: string) {
    return this.tasksService.removeTaskByTitle(title);
  }
}
