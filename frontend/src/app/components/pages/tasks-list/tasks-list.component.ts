import { TasksService } from './../../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/tasks.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  tasks: Task[];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log('tasks:', this.tasks);
    });
  }
}
