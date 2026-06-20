import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { UserService } from '../../core/service/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    userService = {
      login: jest.fn().mockReturnValue(of('jwt-token'))
    } as unknown as jest.Mocked<UserService>;

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [{
        provide: UserService,
        useValue: userService
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit invalid form', () => {
    component.onSubmit();

    expect(component.submitted).toBe(true);
    expect(userService.login).not.toHaveBeenCalled();
  });

  it('should login', () => {
    component.loginForm.setValue({
      login: 'john.doe',
      password: 'password'
    });

    component.onSubmit();

    expect(userService.login).toHaveBeenCalledWith({
      login: 'john.doe',
      password: 'password'
    });
    expect(component.successMessage).toBe('Authentication successful');
    expect(component.loading).toBe(false);
  });

  it('should reset', () => {
    component.submitted = true;
    component.errorMessage = 'Error';
    component.successMessage = 'Success';

    component.onReset();

    expect(component.submitted).toBe(false);
    expect(component.errorMessage).toBe('');
    expect(component.successMessage).toBe('');
    expect(component.loginForm.value).toEqual({
      login: null,
      password: null
    });
  });
});
