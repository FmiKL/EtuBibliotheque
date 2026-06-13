import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../core/models/Login';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-login',
  imports: [CommonModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  loading = false;
  errorMessage = '';
  token = '';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.token = '';

    if (this.loginForm.invalid) {
      return;
    }

    const credentials: Login = {
      login: this.loginForm.get('login')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.loading = true;

    this.userService.login(credentials)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: token => {
          this.token = token;
          this.loading = false;
        },
        error: error => {
          this.errorMessage =
            error.error?.message || 'Authentication failed';
          this.loading = false;
        }
      });
    }

  onReset(): void {
    this.submitted = false;
    this.errorMessage = '';
    this.token = '';
    this.loginForm.reset();
  }
}
