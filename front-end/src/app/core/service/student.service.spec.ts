import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { StudentService } from './student.service';
import { Student } from '../models/Student';

describe('StudentService', () => {
  let service: StudentService;
  let httpTestingController: HttpTestingController;

  const student: Student = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(StudentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should find all', () => {
    service.findAll().subscribe(students => {
      expect(students).toEqual([student]);
    });

    const request = httpTestingController.expectOne('/api/students');
    expect(request.request.method).toBe('GET');

    request.flush([student]);
  });

  it('should find by id', () => {
    service.findById(1).subscribe(result => {
      expect(result).toEqual(student);
    });

    const request = httpTestingController.expectOne('/api/students/1');
    expect(request.request.method).toBe('GET');

    request.flush(student);
  });

  it('should create', () => {
    service.create(student).subscribe(result => {
      expect(result).toEqual(student);
    });

    const request = httpTestingController.expectOne('/api/students');

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(student);

    request.flush(student);
  });

  it('should update', () => {
    service.update(1, student).subscribe(result => {
      expect(result).toEqual(student);
    });

    const request = httpTestingController.expectOne('/api/students/1');

    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(student);

    request.flush(student);
  });

  it('should delete', () => {
    service.delete(1).subscribe();

    const request = httpTestingController.expectOne('/api/students/1');
    expect(request.request.method).toBe('DELETE');

    request.flush(null);
  });
});
