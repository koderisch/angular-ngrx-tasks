import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  assignTask(task): Observable<Task> {
    const url = `${this.apiUrl}/tasks`;
    return this.http.get<Task>(url);
  }
}
