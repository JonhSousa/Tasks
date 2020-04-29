import { TasksService } from './../../../services/tasks.service';
import { Task } from 'src/app/tasks.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css'],
})
export class TasksFormComponent implements OnInit {
  task: Task = {
    title: '',
    text: '',
    done: false,
  };

  constructor(
    private taskService: TasksService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  doAddTask(): void {
    this.taskService.addTask(this.task).subscribe(() => {
      this.snackBar.open('deu certo caralho', 'X', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.router.navigate(['/tarefas']);
    });
  }

  cancel() {
    this.router.navigate(['/tarefas']);
  }
}
