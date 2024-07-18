import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TodayTasksComponent } from '../today-tasks/today-tasks.component';
import { RecentTasksComponent } from '../recent-tasks/recent-tasks.component';
import { TaskStatisticsComponent } from '../task-statistics/task-statistics.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterModule,TodayTasksComponent,RecentTasksComponent,TaskStatisticsComponent, TopBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user:any;
  navbarVisible = false;
  todayTasks: any[] = [];
  completedTasks: any[] = [];
  taskStatistics: any;
  addTaskForm: FormGroup;
  @Input() task: any;

  constructor(private taskService: TaskService, private fb: FormBuilder, private authService:AuthService) {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.user = this.authService.getUserFromToken().subscribe({
      next:(user) =>{
        this.user = user;
      },
      error:(err)=>{
        console.log('Couldnot fetch user details from token',err);
      }
    });
  }

  addTask(): void {
    if (this.addTaskForm.valid) {
      const newTask = this.addTaskForm.value;
      this.taskService.addTask(newTask).subscribe(task => {
        this.todayTasks.push(task);
        this.addTaskForm.reset();
      });
    }
  }


}
