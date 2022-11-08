import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { UserList } from "../interfaces/userlist.model";


@Injectable({providedIn: 'root'})
export class AdminService {

  constructor(private http: HttpClient) {}

  fetchAllUsers() {
    return this.http.get<UserList>(environment.API_PATH + '/admin/all-users');
  }

  deleteUsers(userList: UserList) {
    return this.http.post(environment.API_PATH + '/admin/delete-users', userList);
  }

  blockUsers(userList: UserList) {
    return this.http.post(environment.API_PATH + '/admin/block-users', userList);
  }

  unblockUsers(userList: UserList) {
    return this.http.post(environment.API_PATH + '/admin/unblock-users', userList);
  }

  makeUsersAdmins(userList: UserList) {
    return this.http.post(environment.API_PATH + '/admin/make-admins', userList);
  }

  removeUsersAdmins(userList: UserList) {
    return this.http.post(environment.API_PATH + '/admin/remove-admins', userList);
  }

}
