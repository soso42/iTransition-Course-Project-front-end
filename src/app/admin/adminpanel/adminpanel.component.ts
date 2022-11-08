import { Component, OnInit } from '@angular/core';
import { User } from "../../interfaces/user.model";
import { AdminService } from "../../service/admin.service";
import { UserList } from "../../interfaces/userlist.model";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  users: User[] = [];
  masterIsChecked: boolean = false;

  constructor(private adminService: AdminService, public auth: AuthService) { }

  ngOnInit(): void {
    this.adminService.fetchAllUsers().subscribe(resData => {
      this.users = resData.users;
      this.users.forEach(user => user.isChecked = false);
    });
  }

  blockUsers() {
    let blockUserList = {} as UserList;
    blockUserList.users = this.users.filter(user => user.isChecked);
    this.adminService.blockUsers(blockUserList).subscribe();
    blockUserList.users.forEach(user => user.enabled = false);
    this.logOutCurrentUserIfAffected(blockUserList);
  }

  unblockUsers() {
    let unBlockUserList = {} as UserList;
    unBlockUserList.users = this.users.filter(user => user.isChecked);
    this.adminService.unblockUsers(unBlockUserList).subscribe();
    unBlockUserList.users.forEach(user => user.enabled = true);
  }

  deleteUsers() {
    let deleteList = {} as UserList;
    deleteList.users = this.users.filter(user => user.isChecked);
    this.adminService.deleteUsers(deleteList).subscribe();
    this.users = this.users.filter(user => !deleteList.users.includes(user));
    this.logOutCurrentUserIfAffected(deleteList);
  }

  makeAdmin() {
    let adminList = {} as UserList;
    adminList.users = this.users.filter(user => user.isChecked);
    this.adminService.makeUsersAdmins(adminList).subscribe();
    adminList.users.forEach(user => user.role = 'ADMIN');
  }

  removeAdmin() {
    let removeAdminList = {} as UserList;
    removeAdminList.users = this.users.filter(user => user.isChecked);
    this.adminService.removeUsersAdmins(removeAdminList).subscribe();
    removeAdminList.users.forEach(user => user.role = 'USER');
    this.logOutCurrentUserIfAffected(removeAdminList);
  }

  logOutCurrentUserIfAffected(userList: UserList) {
    userList.users.forEach(user => {
      if (user.username === this.auth.getLoggedInUsername()) {
        this.auth.logout();
      }
    });
  }


  // Checkbox logic
  checkUncheckAll() {
    this.masterIsChecked ? this.unCheckAll() : this.checkAll();
  }

  checkAll() {
    this.masterIsChecked = true;
    this.users.forEach(user => user.isChecked = true);
  }

  unCheckAll() {
    this.masterIsChecked = false;
    this.users.forEach(user => user.isChecked = false);
  }

  checkUncheckRow(user: User) {
    user.isChecked = !user.isChecked;
  }

}
