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
    _id: 0
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

  addTaskToUser(_id) {
    const pos = this.tasks.map(function(e) { return e._id; }).indexOf(_id);
    this.tasks[pos].assigned_user_id = this.loggedIn._id;
  }
  removeTaskFromUser(_id) {
    const pos = this.tasks.map(function(e) { return e._id; }).indexOf(_id);
    this.tasks[pos].assigned_user_id = null;
  }



  /*
  assignTasksToLists(tasks) {
    this.tasks = tasks;
    this.tasksUnassigned = tasks.filter(this.filterUnassigned);
    this.tasksAssignedToUser = tasks.filter(this.filterAssignedToUser)
  }
  filterUnassigned(value) {
    if (!value.assigned_user_id) return value;
  }
  filterAssignedToUser(value) {
    if (value.assigned_user_id === this.loggedIn._id) return value;
  }*/

  //pos = myArray.map(function(e) { return e.hello; }).indexOf('stevie');
}
