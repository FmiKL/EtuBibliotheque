import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialModule } from '../../../shared/material.module';
import { Student } from '../../../core/models/Student';
import { StudentService } from '../../../core/service/student.service';

@Component({
  selector: 'app-student-edit',
  imports: [CommonModule, MaterialModule],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})
export class StudentEditComponent implements OnInit {
  private studentService = inject(StudentService);
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  studentForm: FormGroup = new FormGroup({});
  studentId = 0;
  submitted = false;
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.studentId = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );

    if (!this.studentId) {
      this.errorMessage = 'Invalid student id';
      return;
    }

    this.loadStudent();
  }

  get form() {
    return this.studentForm.controls;
  }

  loadStudent(): void {
    this.loading = true;

    this.studentService.findById(this.studentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: student => {
          this.studentForm.patchValue(student);
          this.loading = false;
        },
        error: error => {
          this.errorMessage =
            error.error?.message || 'Unable to load student';
          this.loading = false;
        }
      });
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

    this.studentService.update(this.studentId, student)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: updatedStudent => {
          this.router.navigate(['/students', updatedStudent.id]);
        },
        error: error => {
          this.errorMessage =
            error.error?.message || 'Unable to update student';
          this.loading = false;
        }
      });
  }

  onReset(): void {
    this.submitted = false;
    this.errorMessage = '';
    this.loadStudent();
  }
}
