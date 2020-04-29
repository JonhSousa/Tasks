import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../tasks.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: Task[];
  baseUrl: string = 'http://localhost:3001/tasks';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  editTask(task: Task): Observable<Task> {
    const customUrl = `${this.baseUrl}/${task.id}`;
    return this.http.put<Task>(customUrl, task);
  }
}
