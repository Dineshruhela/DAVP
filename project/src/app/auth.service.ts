import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Headers, Http, HttpModule, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { } from '../lib.scripthost';
@Injectable()
export class AuthService {

  userID;
  loginUserName;
  options;
  isAuthentic;
  isOTPSent = false;
  allGuestData: any;
  /* baseUrl = 'http://192.168.0.2/Elitewcf/'; Virat_Kohli_Hindi_30Sec_Mov.mov*/

  baseUrl = ' http://usoftlive.in:8081/';

  constructor(private http: HttpClient, private route: Router) {
    if (sessionStorage.getItem('userToken') != null) {
      this.isAuthentic = true;
    }
  }

  getOPT(body: NgForm) {
    const configUrl = this.baseUrl + 'EliteWcfPortal.GuestLogin.svc/GetOtp ';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });

    this.http.post(configUrl, '{"Email":"' + body.value.email + '"}', { headers: headers })
      .subscribe(
        data => {
          this.isOTPSent = true;
        }
      );

  }

  AuthUser(body: NgForm) {
    const configUrl = this.baseUrl + 'EliteWcfPortal.GuestLogin.svc/UserAuth';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });

    this.http.post(configUrl, '{"Email":"' + body.value.email + '","OTP":"' + body.value.OTP + '"}', { headers: headers })
      .subscribe(
        data => {
          if (data['Auth']) {
            sessionStorage.setItem('userToken', body.value.email);
            this.loginUserName = body.value.email;
            this.route.navigate(['home']);
            this.isAuthentic = true;
          }

        }
      );

  }
  checkuser(body: NgForm) {
    const configUrl = this.baseUrl + 'EliteWcfPortal.Login.svc/getLoginUser';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    console.log(JSON.stringify(body.value));
    this.http.post(configUrl, JSON.stringify(body.value), { headers: headers })
      .subscribe(
        data => {

          if (data['isValid']) {
            sessionStorage.setItem('userToken', data['UserName']);
            this.loginUserName = data['UserName'];
            this.route.navigate(['home']);
            this.isAuthentic = true;
          } else {

            alert('Invalid Username and Password');
          }
        }
      );

  }

  getAllDataForGuest() {
    const configUrl = this.baseUrl + 'EliteWcfPortal.Home.svc/GetData';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });

    this.http.get(configUrl)
      .subscribe(
        data => {
          this.allGuestData = data;
        }
      );
  }

  getFile(FileName) {
    const configUrl = this.baseUrl + 'EliteWcfPortal.Home.svc/HomeDownload';

    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream'
    });


    return this.http.get(configUrl + '?FileName=' + FileName.FileName, { headers: headers });
  }

  getAllClient() {
    const configUrl = this.baseUrl + 'EliteWcfPortal.CreateClient.svc/Get';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });

    return this.http.post(configUrl, '{}', { headers: headers });
  }

  getAllChannel() {
    const configUrl = this.baseUrl + 'EliteWcfPortal.Channels.svc/GetData';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });

    return this.http.post(configUrl, '{}', { headers: headers });
  }

  getAllLanguages() {
    const configUrl = this.baseUrl + 'EliteWcfPortal.CreateLanguage.svc/GetLanguageDetails';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });

    return this.http.get(configUrl);
  }
  getAllROList() {
    const configUrl = this.baseUrl + 'EliteWcfPortal.ROList.svc/GetROList';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });

    return this.http.get(configUrl);
  }
  createClient(body: any) {
    const configUrl = this.baseUrl + 'EliteWcfPortal.CreateClient.svc/CreateClient';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });

    return this.http.post(configUrl, JSON.stringify(body.value), { headers: headers });
  }
  createLanguage(body: any) {
    const configUrl = this.baseUrl + 'EliteWcfPortal.CreateLanguage.svc/InsertLanguageDetails';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });

    return this.http.post(configUrl, JSON.stringify(body.value), { headers: headers });
  }

  createChannel(body: any) {
    const configUrl = this.baseUrl + 'EliteWcfPortal.Channels.svc/ChannelCreate';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });

    return this.http.post(configUrl, JSON.stringify(body.value), { headers: headers });
  }

  updateClient(body: any, id) {
    const configUrl = this.baseUrl + 'EliteWcfPortal.CreateClient.svc/UpdateClient';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });

    body.value.ClientId = id;
    console.log(body.value, '"hello"', id);
    return this.http.post(configUrl, JSON.stringify(body.value), { headers: headers });
  }
  updateChannel(body: any, id) {
    const configUrl = this.baseUrl + 'EliteWcfPortal.Channels.svc/ChannelUpdate';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });

    body.value.ChannelId = id;
    console.log(body.value, '"hello"', id);
    return this.http.post(configUrl, JSON.stringify(body.value), { headers: headers });
  }
  updateLanguage(body: any, id) {
    const configUrl = this.baseUrl + 'EliteWcfPortal.CreateLanguage.svc/UpdateLanguageDetails';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; Charset=utf-8',
      'Accept': 'application/json'
    });
    body.value.LanguageID = id;
    return this.http.post(configUrl, JSON.stringify(body.value), { headers: headers });
  }
  logoutNow() {
    if (sessionStorage.getItem('userToken') != null) {
      sessionStorage.removeItem('userToken');
      this.route.navigate(['login']);
      this.isAuthentic = false;
    }
  }

}
