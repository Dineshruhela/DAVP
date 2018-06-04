import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-ro',
  templateUrl: './add-new-ro.component.html',
  styleUrls: ['./add-new-ro.component.css']
})
export class AddNewRoComponent implements OnInit {
  action = '';
  allChannels: any;
  allLanguages: any;
  allClients: any;
  loaded = { channel: false, Language: false, client: false };
  ROForm: FormGroup;
  currentData = new Date();
  chLangList = { ChannelID: 0, ChannelName: '', Languages: [], LanguageID: [] };
  selectedChennel = false;



  constructor(private auth: AuthService) {
    this.ROForm = new FormGroup({
      RoName: new FormControl('', Validators.required),
      ClientName: new FormControl('', Validators.required),
      StartDate: new FormControl('', Validators.required),
      RoStatus: new FormControl('', Validators.required),
      EndDate: new FormControl('', Validators.required)
    });
    auth.getAllChannel()
      .subscribe(
        data => {
          this.allChannels = data;
          this.loaded.channel = true;
        }
      );
    auth.getAllLanguages()
      .subscribe(
        data => {
          this.allLanguages = data;
          this.loaded.Language = true;
        }
      );
    auth.getAllClient()
      .subscribe(
        data => {
          this.allClients = data;
          this.loaded.client = true;

        }
      );

  }

  ngOnInit() {
  }
  checkSelfChennel(e, row) {

    if (this.selectedChennel === true || this.chLangList.ChannelName === row.ChannelName) {

      if (this.chLangList.ChannelName === row.ChannelName) {
        this.chLangList.ChannelName = '';
        this.selectedChennel = false;
        row.checked = false;
      } else {
        e.target.checked = !e.target.checked;
      }


    } else {
      this.selectedChennel = true;
      this.chLangList.ChannelName = row.ChannelName;
      this.chLangList.ChannelID = row.ChannelID;
      row.checked = true;
    }

  }

  checkSelfLang(e, row) {
    if (this.chLangList.Languages.indexOf(row.Language) < 0) {
      this.chLangList.Languages.push(row.Language);
      row.checked = true;
    } else {
      this.chLangList.Languages.splice(this.chLangList.Languages.indexOf(row.Language), 1);
      row.checked = false;
    }

  }
  onDelete() {
    this.chLangList.ChannelName = '';
    this.selectedChennel = false;
    this.chLangList = { ChannelID: 0, ChannelName: '', Languages: [], LanguageID: [] };

    this.allLanguages.forEach((langs) => {
      langs.checked = false;
    });

    this.allChannels.forEach((chennel) => {
      chennel.checked = false;
    });

  }
  onSelectAll() {

    this.chLangList.Languages = [];

    this.allLanguages.forEach((item) => {
      item.checked = true;
      this.chLangList.Languages.push(item.Language);
    });


  }
  resetlang() {
    this.allLanguages.forEach((item) => {
      item.checked = false;
      this.chLangList.Languages = [];
    });
  }

  addRo(form) {

  }
}
