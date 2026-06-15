import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Student } from '../../../core/models/Student';
import { StudentService } from '../../../core/service/student.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-list',
  imports: [RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  private studentService = inject(StudentService);
  private destroyRef = inject(DestroyRef);

  students: Student[] = [];
  loading = false;
  errorMessage = '';
  deletingStudentId?: number;
  successMessage = '';

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

  deleteStudent(student: Student): void {
    if (!student.id || !confirm(`Delete ${student.firstName} ${student.lastName}?`)) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.deletingStudentId = student.id;

    this.studentService.delete(student.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.students = this.students.filter(currentStudent => currentStudent.id !== student.id);
          this.successMessage = 'Student deleted successfully';
          this.deletingStudentId = undefined;
        },
        error: error => {
          this.errorMessage =
            error.error?.message || 'Unable to delete student';
          this.deletingStudentId = undefined;
        }
      });
  }
}
