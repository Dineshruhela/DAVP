import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  allLanguages: any;
  allChannelList: any;
  channelManagementform: FormGroup;
  isUpdate = {
    active: false,
    Id: null
  };

  constructor(private auth: AuthService) {
    auth.getAllLanguages()
      .subscribe(
        data => {
          this.allLanguages = data;
        }
      );
    this.getAllChannels();
    this.channelManagementform = new FormGroup({
      ChannelName: new FormControl('', Validators.required),
      Language: new FormControl('', Validators.required),
      EmailId: new FormControl('', Validators.email),
      ChannelGroup: new FormControl(),
      Password: new FormControl('Welcome@1', Validators.required),
      AlternateEmailId: new FormControl('', Validators.email),
      ContactPerson: new FormControl('', Validators.required),
      ContactNo: new FormControl('', Validators.required),
      AlternateContactNo: new FormControl('', Validators.required)
    });

  }

  ngOnInit() {
  }

  getAllChannels() {
    this.auth.getAllChannel()
      .subscribe(
        data => {
          this.allChannelList = data;
        }
      );
  }
  createNewChannel(f: NgForm) {
    if (this.isUpdate.active) {

      this.auth.updateChannel(f, this.isUpdate.Id).subscribe(
        data => {
          this.channelManagementform.reset();
          this.cleanFormValue();
          this.getAllChannels();
          this.isUpdate.active = false;
          this.isUpdate.Id = null;
        },
        error => {
          alert('Error Occurs');
        }
      );
    } else {
      this.auth.createChannel(f).subscribe(
        data => {
          this.channelManagementform.reset();
          this.cleanFormValue();
          this.getAllChannels();
        },
        error => {
          alert('Error Occurs');
        }
      );
    }

  }

  OnEditRow(row) {
    this.isUpdate.active = true;
    this.isUpdate.Id = row.ChannelId;
    console.log(row);
    this.channelManagementform.patchValue({
      ChannelName: row.ChannelName,
      Language: row.LanguageId,
      EmailId: row.EmailId,
      ChannelGroup: row.ChannelGroupId,
      Password: 'Welcome@1',
      AlternateEmailId: row.AlternateEmailId,
      ContactPerson: row.ContactPerson,
      ContactNo: row.ContactNo,
      AlternateContactNo: row.AlternateContactNo
    });

  }

  cleanFormValue() {
    this.channelManagementform.patchValue({
      ChannelName: '',
      Language: '',
      EmailId: '',
      ChannelGroup: '',
      Password: 'Welcome@1',
      AlternateEmailId: '',
      ContactPerson: '',
      ContactNo: '',
      AlternateContactNo: ''
    });
  }
}
