import { User } from "./user.model";

export interface StoreState {
  loggedInUser: User;
  loggedInStatus: Boolean;
}
