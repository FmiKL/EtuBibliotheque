import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { StudentListComponent } from './student-list.component';
import { StudentService } from '../../../core/service/student.service';
import { Student } from '../../../core/models/Student';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;
  let studentService: jest.Mocked<StudentService>;

  const student: Student = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };

  beforeEach(async () => {
    studentService = {
      findAll: jest.fn().mockReturnValue(of([student])),
      delete: jest.fn().mockReturnValue(of(undefined))
    } as unknown as jest.Mocked<StudentService>;

    await TestBed.configureTestingModule({
      imports: [StudentListComponent],
      providers: [
        {
          provide: StudentService,
          useValue: studentService
        },
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load', () => {
    expect(studentService.findAll).toHaveBeenCalled();
    expect(component.students).toEqual([student]);
    expect(component.loading).toBe(false);
  });

  it('should delete', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    component.deleteStudent(student);

    expect(studentService.delete).toHaveBeenCalledWith(1);
    expect(component.students).toEqual([]);
    expect(component.successMessage).toBe('Student deleted successfully');
    expect(component.deletingStudentId).toBeUndefined();
  });

  it('should cancel', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    component.deleteStudent(student);

    expect(studentService.delete).not.toHaveBeenCalled();
    expect(component.students).toEqual([student]);
  });
});
