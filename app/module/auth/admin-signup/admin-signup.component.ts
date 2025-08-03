import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss']
})
export class AdminSignupComponent {
  admin = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    passkey: ''
  };

  constructor(private http: HttpClient, private router: Router,private authService: AuthService) {}

  get passwordsMatch(): boolean {
    return this.admin.password === this.admin.confirmPassword;
  }

  onSubmit() {
    if (this.admin.password !== this.admin.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const adminPayload = {
      name: this.admin.name,
      email: this.admin.email,
      password: this.admin.password,
      confirmPassword: this.admin.confirmPassword,  // optional for UI
      passkey: this.admin.passkey,
      roles: 'ADMIN'
    };
  
    this.authService.createAdmin(adminPayload).subscribe({
      next: (res) => {
        alert("Admin account created successfully!");
        this.router.navigate(['/login']);  // redirect to login
      },
      error: (err) => {
        console.error(err);
        alert("Admin creation failed: " + err.error);
      }
    });
  }
  
}
