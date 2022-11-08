import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from "./service/auth.interceptor";
import { AppComponent } from './app.component';
import { AdminpanelComponent } from './admin/adminpanel/adminpanel.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { UserpanelComponent } from './home/userpanel/userpanel.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Error403Component } from './error/error403/error403.component';
import { ItemComponent } from './home/item/item.component';
import { CollectionViewComponent } from './home/collection-view/collection-view.component';
import { CollectionEditorComponent } from './home/collection-editor/collection-editor.component';
import { SimplemdeModule } from 'ngx-simplemde';
import { CollectionCreatorComponent } from './home/collection-creator/collection-creator.component';
import { ItemCreatorComponent } from './home/item-creator/item-creator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { SearchResultComponent } from './search-result/search-result.component';
import { ItemEditorComponent } from './home/item-editor/item-editor.component';
import { TagsComponent } from './home/tags/tags.component';
import { TagCloudComponent } from './home/tag-cloud/tag-cloud.component';
import { TagCloudModule } from "angular-tag-cloud-module";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MarkdownModule } from "ngx-markdown";
import { ShowdownModule } from 'ngx-showdown';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    AppComponent,
    AdminpanelComponent,
    HomeComponent,
    HeaderComponent,
    UserpanelComponent,
    LoginComponent,
    SignupComponent,
    Error403Component,
    ItemComponent,
    CollectionViewComponent,
    CollectionEditorComponent,
    CollectionCreatorComponent,
    ItemCreatorComponent,
    SearchResultComponent,
    ItemEditorComponent,
    TagsComponent,
    TagCloudComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        SimplemdeModule.forRoot({
            options: {autosave: {enabled: true, uniqueId: 'MyUniqueID'},},
        }),
        BrowserAnimationsModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        TagCloudModule,
        MatSortModule,
        MatInputModule,
        MarkdownModule,
        ShowdownModule,
        MatProgressSpinnerModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
