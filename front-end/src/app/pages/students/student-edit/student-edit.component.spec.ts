import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { StudentEditComponent } from './student-edit.component';
import { StudentService } from '../../../core/service/student.service';
import { Student } from '../../../core/models/Student';

describe('StudentEditComponent', () => {
  let component: StudentEditComponent;
  let fixture: ComponentFixture<StudentEditComponent>;
  let studentService: jest.Mocked<StudentService>;
  let router: jest.Mocked<Router>;

  const student: Student = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };

  beforeEach(async () => {
    studentService = {
      findById: jest.fn().mockReturnValue(of(student)),
      update: jest.fn().mockReturnValue(of(student))
    } as unknown as jest.Mocked<StudentService>;

    router = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [StudentEditComponent],
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
        },
        {
          provide: Router,
          useValue: router
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load', () => {
    expect(studentService.findById).toHaveBeenCalledWith(1);
    expect(component.studentForm.value).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });
  });

  it('should not submit invalid form', () => {
    component.studentForm.reset();
    component.onSubmit();

    expect(component.submitted).toBe(true);
    expect(studentService.update).not.toHaveBeenCalled();
  });

  it('should update', () => {
    component.studentForm.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com'
    });

    studentService.update.mockReturnValue(of({
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com'
    }));

    component.onSubmit();

    expect(studentService.update).toHaveBeenCalledWith(1, {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com'
    });
    expect(router.navigate).toHaveBeenCalledWith(['/students', 1]);
  });

  it('should reset', () => {
    studentService.findById.mockClear();
    component.onReset();

    expect(component.submitted).toBe(false);
    expect(studentService.findById).toHaveBeenCalledWith(1);
  });
});
