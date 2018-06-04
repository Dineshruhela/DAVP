import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DisplayDataComponent } from './display-data/display-data.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { ChannelComponent } from './channel/channel.component';
import { LanguageManagementComponent } from './language-management/language-management.component';
import { RoManagementComponent } from './ro-management/ro-management.component';
import { AddNewRoComponent } from './add-new-ro/add-new-ro.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'displaydata', component: DisplayDataComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'clientManagement', component: CreateClientComponent, canActivate: [AuthGuard] },
  { path: 'channelManagement', component: ChannelComponent, canActivate: [AuthGuard] },
  { path: 'languageManagement', component: LanguageManagementComponent, canActivate: [AuthGuard] },
  { path: 'roManagement', component: RoManagementComponent, canActivate: [AuthGuard] },
  { path: 'AddRO', component: AddNewRoComponent, canActivate: [AuthGuard] }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DisplayDataComponent,
    HomeComponent,
    CreateClientComponent,
    ChannelComponent,
    LanguageManagementComponent,
    RoManagementComponent,
    AddNewRoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes
    ),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
