import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';
import { VitalTasksComponent } from './components/vital-tasks/vital-tasks.component';
import { TaskStatusComponent } from './components/task-status/task-status.component';
//import { TaskListComponent } from './components/task-list/task-list.component';
//import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'my-tasks', component: MyTasksComponent},
    { path: 'vital-tasks', component: VitalTasksComponent},
    { path: 'task-categories', component: TaskStatusComponent},
    { path: '', redirectTo: '/sign-in', pathMatch: 'full' }
];

