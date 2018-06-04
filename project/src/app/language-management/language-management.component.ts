import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-language-management',
  templateUrl: './language-management.component.html',
  styleUrls: ['./language-management.component.css']
})
export class LanguageManagementComponent implements OnInit {
  LanguageForm: FormGroup;
  allLanguages: any;
  isUpdate = {
    active: false,
    Id: null
  };
  constructor(private auth: AuthService) {

    this.LanguageForm = new FormGroup({

      Language: new FormControl('', Validators.required),
      LanguageDescription: new FormControl('', Validators.required)
    });


  }

  ngOnInit() {
    this.auth.getAllLanguages()
      .subscribe(
        data => {
          this.allLanguages = data;
        }
      );
  }
  createNewLanguage(f: NgForm) {
    if (this.isUpdate.active) {

      this.auth.updateLanguage(f, this.isUpdate.Id).subscribe(
        data => {
          this.LanguageForm.reset();
          this.cleanFormValue();
          this.getLangDataforGrid();
          this.isUpdate.active = false;
          this.isUpdate.Id = null;
        },
        error => {
          alert('Error Occurs');
        }
      );
    } else {
      this.auth.createLanguage(f).subscribe(
        data => {
          this.LanguageForm.reset();
          this.cleanFormValue();
          this.getLangDataforGrid();
        },
        error => {
          alert('Error Occurs');
        }
      );
    }

  }
  getLangDataforGrid() {
    this.auth.getAllLanguages()
      .subscribe(
        data => {
          this.allLanguages = data;
        }
      );
  }
  OnEditRow(row) {
    this.isUpdate.active = true;
    this.isUpdate.Id = row.LanguageID;

    this.LanguageForm.patchValue({
      Language: row.Language,
      LanguageDescription: row.LanguageDescription
    });

  }

  cleanFormValue() {
    this.LanguageForm.patchValue({
      Language: '',
      LanguageDescription: ''
    });
  }

}
