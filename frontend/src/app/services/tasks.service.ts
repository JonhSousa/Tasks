import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../tasks.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: Task[];
  baseUrl: string = 'http://localhost:3001/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }
}
