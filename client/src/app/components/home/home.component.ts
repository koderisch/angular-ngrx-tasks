import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[];
  login = {
    name: "",
    password: ""
  }
  loggedIn: {
    user_name: string,
    user_id: number
  };
  error: "";

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
    this.loggedIn = this.usersService.getLoggedIn();
  }
  getUsers(): void {
    this.usersService.getAll()
      .subscribe(users => this.users = users);
  }
  async logOutUser() {
    this.usersService.logOut();
    this.loggedIn = null;
  }
  logInUser() {
    this.usersService.logIn(this.login)
      .subscribe(user => { this.logInSuccess(user) });
  }

  showError(err) {
    this.error = err;
  }

  async logInSuccess(user) {
    if (user && user.error) {
      this.showError(user.error);
    } else {
      await this.usersService.storeLogin(user)
      this.router.navigateByUrl('/tasks');
    }
  }
}
