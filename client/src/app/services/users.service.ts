import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User, Credentials } from '../models/user.model';

@Injectable()
export class UsersService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<User[]>(url);
  }

  logIn(credentials: Credentials): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(url, JSON.stringify(credentials), {
      headers: headers,
    });
  }
}
