import { Component } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vital-todos',
  standalone: true,
  imports: [TaskCardComponent, CommonModule],
  templateUrl: './vital-todos.component.html',
  styleUrl: './vital-todos.component.css'
})
export class VitalTodosComponent {
  vitalTasks:any[]=[];

  constructor(private taskService:TaskService){}

  ngOnInit():void{
    this.loadVitalTasks();
  }

  loadVitalTasks():void{
    this.taskService.getTasks('to do').subscribe({
      next:(tasks)=>{
        console.log('vital tasks', tasks);
        this.vitalTasks = tasks;
      },
      error:(error)=>{
        console.log(error);
      }
      
    })
  }
}
