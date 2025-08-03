import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UserStorageService } from '../services/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submitForm() {
    this.authService.login(this.validateForm.value).subscribe(
      res => {
        this.message.success('Login successful', { nzDuration: 5000 });

        const user = {
          id: res.id,
          name: res.name,        // ✅ Corrected field
          email: res.email,      // ✅ Stored email for profile
          role: res.roles ,
          branch:res.branch       // ✅ Stored role
        };

        UserStorageService.saveUser(user); // ✅ Save in local storage

        // Redirect based on role
        if (user.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']).then(() => {
            window.location.reload(); // to update navbar
          });
        } else if (user.role === 'USER') {
          this.router.navigate(['/user/dashboard']).then(() => {
            window.location.reload(); // to update navbar
          });
        } else {
          this.router.navigate(['/login']);
        }

        console.log(res);
      },
      error => {
        this.message.error('Bad credentials', { nzDuration: 5000 });
      }
    );
  }
}
