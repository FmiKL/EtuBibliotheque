import { Routes } from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {AppComponent} from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentListComponent } from './pages/students/student-list/student-list.component';
import { authGuard } from './core/guard/auth.guard';
import { StudentDetailComponent } from './pages/students/student-detail/student-detail.component';
import { StudentCreateComponent } from './pages/students/student-create/student-create.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'students/new',
    component: StudentCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'students/:id',
    component: StudentDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [authGuard]
  }
];
