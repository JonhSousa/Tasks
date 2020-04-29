import { TasksService } from './../../../services/tasks.service';
import { Task } from 'src/app/tasks.model';
import { Router, ActivatedRoute } from '@angular/router';
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

  snackObject = {};

  constructor(
    private taskService: TasksService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.doGetById(parseInt(id));
    }
  }

  doChooseAction(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id:', id);
    if (id !== null) {
      console.log('veio pra ca', this.task);
      this.doEditTask();
    } else {
      this.doAddTask();
    }
  }

  changeSelectedTask(task: Task): void {
    this.task = task;
  }

  doCheck(task: Task): void {
    task.done = !task.done;
    this.changeSelectedTask(task);
    this.doEditTask();
  }

  doAddTask(): void {
    this.taskService.addTask(this.task).subscribe(() => {
      this.snackBar.open('New task added', 'X', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.router.navigate(['/tarefas']);
    });
  }

  doEditTask(): void {
    this.taskService.editTask(this.task).subscribe(() => {
      this.snackBar.open('Task edited', 'X', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.router.navigate(['/tarefas']);
    });
  }

  doGetById(id: number): void {
    this.taskService.getTaskById(id).subscribe((task) => (this.task = task));
  }

  cancel() {
    this.router.navigate(['/tarefas']);
  }
}
