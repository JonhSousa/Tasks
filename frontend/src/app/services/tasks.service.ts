import { AuthService } from './../auth.service';
import { User } from './../user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../task.model';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: Task[];
  user: User;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  addTask(task: Task) {
    const taskObject = { ...task };
    return this.firestore.collection('tasks').doc(task.id).set(taskObject);
  }

  getTasks() {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      console.log('asdsadsadas:', this.user);
    });
    return this.firestore.collection('tasks').snapshotChanges();
  }

  getTaskById(id: string) {
    return this.firestore
      .collection('tasks', (ref) => ref.where('id', '==', id))
      .snapshotChanges();
  }

  editTask(task: Task) {
    const taskObject = { ...task };
    return this.firestore.doc('tasks/' + task.id).update(taskObject);
  }

  deleteTask(task: Task) {
    return this.firestore.doc('tasks/' + task.id).delete();
  }
}
