import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialModule } from '../../../shared/material.module';
import { Student } from '../../../core/models/Student';
import { StudentService } from '../../../core/service/student.service';

@Component({
  selector: 'app-student-create',
  imports: [CommonModule, MaterialModule],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent implements OnInit {
  private studentService = inject(StudentService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  studentForm: FormGroup = new FormGroup({});
  submitted = false;
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get form() {
    return this.studentForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.studentForm.invalid) {
      return;
    }

    const student: Student = {
      firstName: this.studentForm.get('firstName')?.value,
      lastName: this.studentForm.get('lastName')?.value,
      email: this.studentForm.get('email')?.value
    };

    this.loading = true;

    this.studentService.create(student)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: createdStudent => {
          this.router.navigate(['/students', createdStudent.id]);
        },
        error: error => {
          this.errorMessage =
            error.error?.message || 'Unable to create student';
          this.loading = false;
        }
      });
  }

  onReset(): void {
    this.submitted = false;
    this.errorMessage = '';
    this.studentForm.reset();
  }
}
