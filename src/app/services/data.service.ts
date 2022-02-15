import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasks: Task[] = [];

  constructor() { console.log('dataService get constructed'); }

  getTasks(): Observable<Task[]> {
    return new Observable<Task[]>((observable) => {
      observable.next(this.tasks);
      observable.complete();
    });
  }

  getTask(id: number) {
    return new Observable<Task>((observable) => {
      observable.next(this.tasks.find(task => task.id === id));
      observable.complete();
    });
  }

  addTask(task: Task) {
    if(!task || !task.name || task.name.trim().length == 0) {
      return;
    }

    task.id = this.tasks.length + 1;
    this.tasks.push(new Task(task.id, task.name, task.description));
  }

  editTask(task: Task) {
    let updateTask = this.tasks.find(t => t.id === task.id);
    if(updateTask) {
      updateTask.name = task.name;
      updateTask.description = task.description;
    }
  }
}
