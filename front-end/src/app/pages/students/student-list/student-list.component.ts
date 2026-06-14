import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Student } from '../../../core/models/Student';
import { StudentService } from '../../../core/service/student.service';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  private studentService = inject(StudentService);
  private destroyRef = inject(DestroyRef);

  students: Student[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loading = true;

    this.studentService.findAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: students => {
          this.students = students;
          this.loading = false;
        },
        error: error => {
          this.errorMessage = error.error?.message || 'Unable to load students';
          this.loading = false;
        }
      });
  }
}
