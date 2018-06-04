import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuthentic;
  username;
  constructor(private route: Router, public auth: AuthService) {
    this.isAuthentic = sessionStorage.getItem('userToken') != null ? true : false;
    this.username = auth.loginUserName;

    if (sessionStorage.getItem('userToken') != null) {

      this.username = sessionStorage.getItem('userToken');
    }
    console.log(this.username);
  }
  ngOnInit() {
    this.username = this.auth.loginUserName;
    if (sessionStorage.getItem('userToken') != null) {
      this.username = sessionStorage.getItem('userToken');
    }
    console.log(this.username);

  }
  onLogout() {
    this.auth.logoutNow();
    this.isAuthentic = sessionStorage.getItem('userToken') != null ? true : false;
  }
}
