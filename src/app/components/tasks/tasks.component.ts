import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { UsersService } from '../../services/users.service';
import { TasksService } from '../../services/tasks.service';

import { Task } from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  loggedIn: {
    name: "",
    id: number
  };
  tasks: Task[];
  tasksUnassigned: Task[];
  tasksAssignedToUser: Task[];
  filterUnassigned: {};


  constructor(
    private usersService: UsersService,
    private tasksService: TasksService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkIfLoggedIn();
    this.buildTasksList();
    this.filterUnassigned = { assigned_user_id: null };
  }

  checkIfLoggedIn() {
    this.loggedIn = this.usersService.getLoggedIn();
    if (!this.loggedIn) {
      this.router.navigateByUrl("/");
    }
  }
  async logOutUser() {
    this.usersService.logOut();
    this.router.navigateByUrl("/");
  }

  buildTasksList() {
    this.tasksService.getAll()
      .subscribe(tasks => { this.tasks = tasks });
  }

  addTaskToUser(id) {
    const pos = this.tasks.map(function(e) { return e.id; }).indexOf(id);
    this.tasks[pos].assigned_user_id = this.loggedIn.id;
  }
  removeTaskFromUser(id) {
    const pos = this.tasks.map(function(e) { return e.id; }).indexOf(id);
    this.tasks[pos].assigned_user_id = null;
  }
}
