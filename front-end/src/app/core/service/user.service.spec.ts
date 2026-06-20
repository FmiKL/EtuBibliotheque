import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { UserService } from './user.service';
import { Register } from '../models/Register';
import { Login } from '../models/Login';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  const registerUser: Register = {
    firstName: 'John',
    lastName: 'Doe',
    login: 'john.doe',
    password: 'password'
  };

  const credentials: Login = {
    login: 'john.doe',
    password: 'password'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register', () => {
    service.register(registerUser).subscribe();

    const request = httpTestingController.expectOne('/api/register');

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(registerUser);

    request.flush(null);
  });

  it('should login and  store the token', () => {
    service.login(credentials).subscribe(token => {
      expect(token).toBe('jwt-token');
      expect(localStorage.getItem('token')).toBe('jwt-token');
    });

    const request = httpTestingController.expectOne('/api/login');

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(credentials);
    expect(request.request.responseType).toBe('text');

    request.flush('jwt-token');
  });

  it('should get token', () => {
    localStorage.setItem('token', 'jwt-token');
    expect(service.getToken()).toBe('jwt-token');
  });

  it('should be authenticated', () => {
    localStorage.setItem('token', 'jwt-token');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should logout', () => {
    localStorage.setItem('token', 'jwt-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
