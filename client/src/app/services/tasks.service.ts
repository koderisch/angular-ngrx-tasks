import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

import { environment } from '../../environments/environment';
import { Task } from '../models/task.model';

@Injectable()
export class TasksService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    const url = `${this.apiUrl}/tasks`;
    return this.http.get<Task[]>(url);
  }

  assignTask(task): Observable<any> {
    const url = `${this.apiUrl}/assigntask`;
    return this.http.post(url, task);
  }

  unAssignTask(task): Observable<any> {
    const url = `${this.apiUrl}/assigntask`;
    task = { ...task, user_id: null };
    return this.http.post(url, task);
  }

  addTask(task): Observable<any> {
    const task_id = uuidv4();
    task = { ...task, task_id: task_id };
    const url = `${this.apiUrl}/addtask`;
    return this.http.post(url, task);
  }
}
