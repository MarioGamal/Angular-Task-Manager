import { Component } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-recent-tasks',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './recent-tasks.component.html',
  styleUrl: './recent-tasks.component.css'
})
export class RecentTasksComponent {
  completedTasks: any[]=[];

  constructor(private taskService: TaskService){}

  ngOnInit():void{
    this.loadRecentTasks();
  }

  loadRecentTasks():void{
    this.taskService.getRecentCompletedTasks().subscribe({
      next:(tasks)=>{
        this.completedTasks = tasks;
      }
    })
  }
}
