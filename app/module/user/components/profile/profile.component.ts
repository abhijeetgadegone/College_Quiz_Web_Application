// src/app/module/user/components/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../auth/services/user-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = UserStorageService.getUser(); 
    console.log('User loaded in profile:', this.user);
  }

  changePassword(): void {
    this.router.navigate(['/change-password']);
  }
}
