import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../models/Task';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss']
})
export class TaskEditFormComponent implements OnInit, OnDestroy {

  task: any = {};

  subscription: Subscription | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.subscription = this.dataService.getTask(Number(id)).subscribe(task => this.task = new Task(task?.id, task?.name, task?.description));
    }
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  onEdit() {
    this.dataService.editTask(this.task);
    this.router.navigateByUrl('/todo');
  }
}
