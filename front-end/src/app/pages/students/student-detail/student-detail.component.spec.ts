import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StudentDetailComponent } from './student-detail.component';
import { StudentService } from '../../../core/service/student.service';
import { Student } from '../../../core/models/Student';

describe('StudentDetailComponent', () => {
  let component: StudentDetailComponent;
  let fixture: ComponentFixture<StudentDetailComponent>;
  let studentService: jest.Mocked<StudentService>;

  const student: Student = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };

  beforeEach(async () => {
    studentService = {
      findById: jest.fn().mockReturnValue(of(student))
    } as unknown as jest.Mocked<StudentService>;

    await TestBed.configureTestingModule({
      imports: [StudentDetailComponent],
      providers: [
        {
          provide: StudentService,
          useValue: studentService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load', () => {
    expect(studentService.findById).toHaveBeenCalledWith(1);
    expect(component.student).toEqual(student);
    expect(component.loading).toBe(false);
  });
});
