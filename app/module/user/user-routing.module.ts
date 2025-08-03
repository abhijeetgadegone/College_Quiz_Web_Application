import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TakeTestComponent } from './components/take-test/take-test.component';
import { ViewMyTestResultsComponent } from './components/view-my-test-results/view-my-test-results.component';
import { UserDashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './components/profile/profile.component';





const routes: Routes = [
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'view-my-test-results', component: ViewMyTestResultsComponent },
  { path: 'take-test/:id', component: TakeTestComponent },
  { path: 'start-test/:id', component: TakeTestComponent },
  { path: 'profile', component: UserProfileComponent },



 
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
