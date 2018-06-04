import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: String = '';

  constructor(public auth: AuthService) {
    if (sessionStorage.getItem('userToken') != null) {
      this.username = sessionStorage.getItem('userToken');
    }
    this.auth.getAllDataForGuest();
  }
  downloadFile(FileName) {
    const obj = {
      FileName: FileName
    };
    window.open('http://usoftlive.in:8081/EliteWcfPortal.Home.svc/HomeDownload?FileName=' + FileName);
    /*   this.auth.getFile(obj)
        .map(res => {
          console.log(res);
        })
        .subscribe(); */
  }
  download(data) {
    const blob = new Blob([data], { type: 'video/mp4' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  ngOnInit() {
  }

}
