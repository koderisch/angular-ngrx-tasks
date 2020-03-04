import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class UsersService {

  private apiUrl = `${environment.apiUrl}`;
  private USER_STORE_KEY = "pbtasks-user-store";

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) { }

  getAll(): Observable<User[]> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<User[]>(url)
  }

  getLoggedIn() {
    const user = this.storage.get(this.USER_STORE_KEY) || "";
    return (user);
  }

  storeLogin(user) {
    this.storage.set(this.USER_STORE_KEY, user);
  }

  logOut() {
    this.storage.remove(this.USER_STORE_KEY);
  }

  logIn(login): Observable<any> {
    //    console.log("logIn:", login.name);
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post<User>(url, JSON.stringify(login), { headers: headers });
  }


}
