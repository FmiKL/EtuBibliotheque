import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { StudentCreateComponent } from './student-create.component';
import { StudentService } from '../../../core/service/student.service';
import { Student } from '../../../core/models/Student';

describe('StudentCreateComponent', () => {
  let component: StudentCreateComponent;
  let fixture: ComponentFixture<StudentCreateComponent>;
  let studentService: jest.Mocked<StudentService>;
  let router: jest.Mocked<Router>;

  const createdStudent: Student = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };

  beforeEach(async () => {
    studentService = {
      create: jest.fn().mockReturnValue(of(createdStudent))
    } as unknown as jest.Mocked<StudentService>;

    router = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [StudentCreateComponent],
      providers: [
        {
          provide: StudentService,
          useValue: studentService
        },
        {
          provide: Router,
          useValue: router
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit invalid form', () => {
    component.onSubmit();

    expect(component.submitted).toBe(true);
    expect(studentService.create).not.toHaveBeenCalled();
  });

  it('should submit', () => {
    component.studentForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });

    component.onSubmit();

    expect(studentService.create).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });
    expect(router.navigate).toHaveBeenCalledWith(['/students', 1]);
  });

  it('should reset', () => {
    component.submitted = true;
    component.errorMessage = 'Error';

    component.onReset();

    expect(component.submitted).toBe(false);
    expect(component.errorMessage).toBe('');
    expect(component.studentForm.value).toEqual({
      firstName: null,
      lastName: null,
      email: null
    });
  });
});
