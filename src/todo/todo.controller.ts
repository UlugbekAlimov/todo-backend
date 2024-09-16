import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schema/todo.schema';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get('search')
  async findByTitle(@Query('title') title: string): Promise<Todo[]> {
    return this.todoService.findByTitle(title);
  }

  @Post()
  async createTodo(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoList: Partial<Todo>,
  ): Promise<Todo> {
    return this.todoService.update(id, updateTodoList);
  }

  @Patch(':id/complete')
  async toggleCompleted(@Param('id') id: string): Promise<Todo> {
    return this.todoService.toggleCompleted(id);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<any> {
    return this.todoService.deleteTodo(id);
  }
}
