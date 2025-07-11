import { Routes } from '@angular/router';
import { SignupComponent } from './module/auth/signup/signup.component';
import { LoginComponent } from './module/auth/login/login.component';
import { UserDashboardComponent } from './module/user/components/dashboard/dashboard.component';
import { DashboardComponent as AdminDashboardComponent } from './module/admin/components/dashboard/dashboard.component';
import { AdminSignupComponent } from './module/auth/admin-signup/admin-signup.component';
import { ViewCorrectQuestionsComponent } from './module/user/components/view-correct-questions/view-correct-questions.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./module/admin/admin.module').then(m => m.AdminModule) },
  { path: 'user/dashboard', component: UserDashboardComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin-signup', component: AdminSignupComponent },
 { path: 'view-correct-questions/:userId/:testId', component: ViewCorrectQuestionsComponent }


];
