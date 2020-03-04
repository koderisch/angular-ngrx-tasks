import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
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
  loggedIn: ""

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
    this.loggedIn = "";
  }
  logInUser() {
    //console.log(this.login);
    this.usersService.logIn(this.login)
      .subscribe(user => { this.logInSuccess(user) });
  }

  async logInSuccess(user) {
    //console.log(user);
    await this.usersService.storeLogin(user)
    //this.loggedIn = this.usersService.getLoggedIn();
    //this.login._password = "";
    //this.login._name = "";
    this.router.navigateByUrl('/tasks');

  }
}
