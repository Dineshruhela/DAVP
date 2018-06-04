import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  allClient: any;
  CreateClientForm: FormGroup;
  ShowMsg = false;
  isUpdate = {
    active: false,
    Id: null
  };
  constructor(private auth: AuthService) {
    this.CreateClientForm = new FormGroup({

      ClientName: new FormControl('', Validators.required),
      ClientAddress: new FormControl('', Validators.required),
      EmailId: new FormControl('', Validators.email),
      Designation: new FormControl('', Validators.required),
      ContactPerson: new FormControl('', Validators.required),
      ContactNo: new FormControl('', Validators.required)
    });
    this.getClientDataforGrid();
  }

  ngOnInit() {
  }


  getClientDataforGrid() {
    this.auth.getAllClient().subscribe(
      data => {
        this.allClient = data;
      });
  }
  createNewClient(f: NgForm) {
    if (this.isUpdate.active) {

      this.auth.updateClient(f, this.isUpdate.Id).subscribe(
        data => {
          this.CreateClientForm.reset();
          this.cleanFormValue();
          this.getClientDataforGrid();
          this.isUpdate.active = false;
          this.isUpdate.Id = null;
        },
        error => {
          alert('Error Occurs');
        }
      );
    } else {
      this.auth.createClient(f).subscribe(
        data => {
          this.CreateClientForm.reset();
          this.cleanFormValue();
          this.getClientDataforGrid();
        },
        error => {
          alert('Error Occurs');
        }
      );
    }

  }

  OnEditRow(row) {
    this.isUpdate.active = true;
    this.isUpdate.Id = row.ClientId;

    this.CreateClientForm.patchValue({
      ClientName: row.ClientName,
      ClientAddress: row.ClientAddress,
      EmailId: row.EmailId,
      Designation: row.Designation,
      ContactPerson: row.ContactPerson,
      ContactNo: row.ContactNo
    });

  }

  cleanFormValue() {
    this.CreateClientForm.patchValue({
      ClientName: '',
      ClientAddress: '',
      EmailId: '',
      Designation: '',
      ContactPerson: '',
      ContactNo: ''
    });
  }

}
