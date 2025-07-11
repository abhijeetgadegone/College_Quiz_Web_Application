import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../../../auth/services/user-storage.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  user: any;

  ngOnInit(): void {
    this.user = UserStorageService.getUser();
  }

  changePassword() {
    // Future: Show password change form or navigate to password component
    alert("Change Password clicked");
  }
}
