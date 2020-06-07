import { TasksService } from './../../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/task.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  tasks: Task[];
  task: Task;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((data) => {
      this.tasks = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Task;
      });
    });
  }

  changeSelectedTask(task: Task): void {
    this.task = task;
    console.log('task:', task);
  }

  doCheck(task: Task): void {
    task.done = !task.done;
    this.changeSelectedTask(task);
    this.doEditTask();
  }

  doEditTask(): void {
    this.tasksService.editTask(this.task).then(() => {
      this.snackBar.open('Task edited', 'X', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['white-snackbar'],
      });
    });
  }

  doDeleteTask(task: Task): void {
    this.changeSelectedTask(task);
    this.tasksService.deleteTask(task).then(() => {
      this.snackBar.open('Task deleted', 'X', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['white-snackbar'],
      });
      this.router.navigate(['/tarefas']);
      this.tasksService.getTasks().subscribe((data) => {
        this.tasks = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as {}),
          } as Task;
        });
      });
    });
  }
}
