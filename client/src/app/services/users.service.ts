import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { environment } from '../../environments/environment';
import { User, Credentials } from '../models/user.model';

@Injectable()
export class UsersService {
  private apiUrl = `${environment.apiUrl}`;
  private USER_STORE_KEY = 'tasks-user-store';

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

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

  getUserFromLocalStorage() {
    const userStorage = this.storage.get(this.USER_STORE_KEY);
    const user = userStorage
      ? (({ user_id, user_name }) => ({ user_id, user_name }))(userStorage)
      : undefined;
    return user;
  }

  storeUserInLocalStorage(user) {
    this.storage.set(this.USER_STORE_KEY, user);
  }

  removeUserFromLocalStorage() {
    this.storage.remove(this.USER_STORE_KEY);
  }
}
