import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../../../auth.service';
import { TasksService } from './../../../services/tasks.service';
import { Task } from 'src/app/task.model';
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
    email: '',
  };

  snackObject = {};

  constructor(
    private taskService: TasksService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public auth: AuthService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.doGetById(id);
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
    this.auth.user$.subscribe((user) => {
      this.task.email = user.email;
      this.task.id = this.firestore.createId();
      this.taskService.addTask(this.task).then(() => {
        this.snackBar.open('New task added', 'X', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['white-snackbar'],
        });
        this.router.navigate(['/tarefas']);
      });
    });
  }

  doEditTask(): void {
    this.taskService.editTask(this.task).then(() => {
      this.snackBar.open('Task edited', 'X', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['white-snackbar'],
      });
      this.router.navigate(['/tarefas']);
    });
  }

  doGetById(id: string): void {
    this.taskService.getTaskById(id).subscribe(
      (data) =>
        (this.task = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as {}),
          } as Task;
        })[0])
    );
  }

  cancel() {
    this.router.navigate(['/tarefas']);
  }
}
