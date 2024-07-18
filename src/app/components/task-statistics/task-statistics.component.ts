import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-task-statistics',
  standalone: true,
  imports: [],
  templateUrl: './task-statistics.component.html',
  styleUrl: './task-statistics.component.css'
})
export class TaskStatisticsComponent {
  taskStats:any;
 constructor(private taskService : TaskService){}
 ngOnInit():void{
  this.loadTaskStatistics();
 }

 loadTaskStatistics():void{
  this.taskService.getTaskStatistics().subscribe(stats => {
    console.log('stats',stats);
    this.taskStats = stats;
    this.renderChart();
  });
 }

 renderChart(): void {
  const ctx = document.getElementById('taskChart') as HTMLCanvasElement;
  if (Number(this.taskStats.toDo) + Number(this.taskStats.inProgress) + Number(this.taskStats.completed == 0)){
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Completed', 'In Progress', 'To Do'],
        datasets: [{
          data: [this.taskStats?.completed, this.taskStats?.inProgress, this.taskStats?.toDo],
          backgroundColor: ['#05A301', '#0225FF', '#F21E1E'],
          hoverBackgroundColor: ['#66bb6a', '#42a5f5', '#ef5350']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
  
}
}
