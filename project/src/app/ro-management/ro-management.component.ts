import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ro-management',
  templateUrl: './ro-management.component.html',
  styleUrls: ['./ro-management.component.css']
})
export class RoManagementComponent implements OnInit {
  allROData;
  constructor(private auth: AuthService, private route: Router) {
    auth.getAllROList()
      .subscribe(
        data => {
          this.allROData = data;
        }
      );
  }

  ngOnInit() {
  }
  onAddClick() {
    this.route.navigate(['AddRO']);
  }

}
