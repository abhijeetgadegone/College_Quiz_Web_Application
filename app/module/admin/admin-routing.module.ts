import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { AddQuestionTestComponent } from './components/add-question-test/add-question-test.component';
import { ViewTestComponent } from './components/view-test/view-test.component';
import { ViewTestResultsComponent } from '../admin/components/view-test-results/view-test-results.component';
import { TestListComponent } from './components/test-list-component';
import { AdminProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'create-test',component:CreateTestComponent},
  {path:'add-question/:id',component: AddQuestionTestComponent},
  {path:'view-test/:id',component: ViewTestComponent},
  {path:'View-test-results',component: ViewTestResultsComponent},
  {path :'test-list',component:TestListComponent},
  { path: 'profile', component: AdminProfileComponent }

  

 
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
