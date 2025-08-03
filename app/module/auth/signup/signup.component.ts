import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  validateForm!: FormGroup;
  branchOptions = ['Computer Engineering', 'IT Engineering', 'Mechanical Engineering', 'Civil Engineering', 'MCA'];


  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      branch: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        null,
        [Validators.required, this.confirmationValidator.bind(this)]
      ]
    });

    this.validateForm.get('password')?.valueChanges.subscribe(() => {
      this.validateForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  confirmationValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { required: true };
    }
    return control.value === this.validateForm.get('password')?.value
      ? null
      : { mismatch: true };
  }

  submitForm(): void {
    if (this.validateForm.invalid) {
      Object.values(this.validateForm.controls).forEach(control =>
        control.markAsDirty()
      );
      return;
    }

    const { confirmPassword, ...formData } = this.validateForm.value;

    this.authService.register(formData).subscribe(
      res => {
        this.message.success(`Signup Successfully`, { nzDuration: 5000 });
        this.router.navigateByUrl('/login');
      },
      error => {
        this.message.error(`${error.error}`, { nzDuration: 5000 });
      }
    );
  }
}
