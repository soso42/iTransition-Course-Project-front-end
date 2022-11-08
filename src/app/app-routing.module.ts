import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdminpanelComponent } from "./admin/adminpanel/adminpanel.component";
import { UserpanelComponent } from "./home/userpanel/userpanel.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AdminGuard } from "./shared/admin.guard";
import { Error403Component } from "./error/error403/error403.component";
import { UserGuard } from "./shared/user.guard";
import { ItemComponent } from "./home/item/item.component";
import { CollectionViewComponent } from "./home/collection-view/collection-view.component";
import { CollectionEditorComponent } from "./home/collection-editor/collection-editor.component";
import { CollectionCreatorComponent } from "./home/collection-creator/collection-creator.component";
import { ItemCreatorComponent } from "./home/item-creator/item-creator.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { ItemEditorComponent } from "./home/item-editor/item-editor.component";

const routes: Routes = [
  // admin
  { path: 'admin', component: AdminpanelComponent, canActivate: [AdminGuard] },
  // User
  { path: 'user', component: UserpanelComponent, canActivate: [UserGuard] },
  { path: 'collection/creator', component: CollectionCreatorComponent, canActivate: [UserGuard] },
  { path: 'collection/editor/:id', component: CollectionEditorComponent, canActivate: [UserGuard] },
  { path: 'item/create', component: ItemCreatorComponent, canActivate: [UserGuard] },
  { path: 'item/editor/:id', component: ItemEditorComponent, canActivate: [UserGuard] },
  // Open
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'error403', component: Error403Component },
  { path: 'collection/view/:id', component: CollectionViewComponent },
  { path: 'item/view/:id', component: ItemComponent },
  { path: 'search/:term', component: SearchResultComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
