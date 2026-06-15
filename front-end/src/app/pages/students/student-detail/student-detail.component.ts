import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Student } from '../../../core/models/Student';
import { StudentService } from '../../../core/service/student.service';

@Component({
  selector: 'app-student-detail',
  imports: [],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent implements OnInit {
  private studentService = inject(StudentService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  student?: Student;
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage = 'Invalid student id';
      return;
    }

    this.loading = true;

    this.studentService.findById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: student => {
          this.student = student;
          this.loading = false;
        },
        error: error => {
          this.errorMessage =
            error.error?.message || 'Unable to load student';
          this.loading = false;
        }
      });
  }
}
