import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isGuest: Boolean = false;
  myform: FormGroup;
  loginAdmin: FormGroup;
  loader = false;
  constructor(public authservice: AuthService) {
    this.myform = new FormGroup({
      chname: new FormControl('', Validators.required),
      gname: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      OTP: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
    });
    this.loginAdmin = new FormGroup({

      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
    });
  }
  ngOnInit() {
  }

  onChange($event) {
    this.isGuest = $event.target.checked;
  }
  authUser(loginForm: any) {
    if (this.isGuest === true) {
      if (this.authservice.isOTPSent) {
        this.authservice.AuthUser(loginForm);
        this.loader = false;
      } else {
        this.authservice.getOPT(loginForm);
        this.loader = true;
      }
    } else {
      this.authservice.checkuser(loginForm);
    }
  }
}
