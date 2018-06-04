import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {
  username: String = '';
  auth;
  constructor(auth: AuthService) {
    if (sessionStorage.getItem('userToken') != null) {
      this.username = sessionStorage.getItem('userToken');
    }
    this.auth = auth;
  }

  ngOnInit() {
  }

}
