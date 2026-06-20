import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';
import { UserService } from '../../core/service/user.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: jest.Mocked<UserService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    userService = {
      register: jest.fn().mockReturnValue(of(null))
    } as unknown as jest.Mocked<UserService>;

    router = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }, {
          provide: Router,
          useValue: router
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit invalid form', () => {
    component.onSubmit();

    expect(component.submitted).toBe(true);
    expect(userService.register).not.toHaveBeenCalled();
  });

  it('should register', () => {
    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      login: 'john.doe',
      password: 'pass'
    });

    component.onSubmit();

    expect(userService.register).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      login: 'john.doe',
      password: 'pass'
    });
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should reset', () => {
    component.submitted = true;
    component.onReset();

    expect(component.submitted).toBe(false);

    expect(component.registerForm.value).toEqual({
      firstName: null,
      lastName: null,
      login: null,
      password: null
    });
  });
});
