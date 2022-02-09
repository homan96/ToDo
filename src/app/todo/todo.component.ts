import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../models/Task';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  task: Task = new Task(0, '', '');

  tasks$: Task[] = [];

  selectedIndex: number = -1;

  subscription: Subscription | undefined;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.getTasks().subscribe(value => {
      this.tasks$ = value;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  addTask() {
    this.dataService.addTask(new Task(this.task.id, this.task.name, this. task.description));
  }

  moveTop() {
    // if first item them don't move up
    if(this.selectedIndex == 0 || this.selectedIndex == -1)
      return;

    this.moveTask(-1, this.selectedIndex);
  }

  moveDown() {
    // if last item them don't move down
    if(this.selectedIndex == this.tasks$.length - 1 || this.selectedIndex == -1)
      return;

    this.moveTask(1, this.selectedIndex);
  }

  moveTask(direction: number, moveIndex: number) {
    // direction: -1 moveTop, +1 moveDown
    let targetIndex = moveIndex + (1 * direction);

    let targetTask = this.tasks$[targetIndex];
    let currentTask = this.tasks$[moveIndex];

    let swapedTasks = direction == 1 ? [targetTask, currentTask] : [currentTask, targetTask];

    let spliceIndex = direction == 1 ? targetIndex - 1 : targetIndex;
    this.tasks$.splice(spliceIndex, 2, ...swapedTasks);

    this.selectedIndex = targetIndex;
  }

  selectIndex(index: number) {
    this.selectedIndex = index;
  }

  onTaskDblClicked(taskId: number) {
    this.router.navigateByUrl('/todo/tasks/' + taskId);
  }
}
