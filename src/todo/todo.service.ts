import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schema/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findByTitle(title: string): Promise<Todo[]> {
    return this.todoModel
      .find({ title: { $regex: new RegExp(`.*${title}.*`, 'i') } })
      .exec();
  }

  async toggleCompleted(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException(`${id} not found`);
    }
    todo.completed = !todo.completed;
    return todo.save();
  }

  async create(todo: Todo): Promise<Todo> {
    const newTodo = new this.todoModel(todo);
    return newTodo.save();
  }

  async update(id: string, updateTodoList: Partial<Todo>): Promise<Todo> {
    const todo = await this.todoModel
      .findByIdAndUpdate(id, updateTodoList, { new: true })
      .exec();
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async deleteTodo(id: string): Promise<any> {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}
