import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { TaskStatusService } from '../../services/task-status.service';


@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [NavbarComponent,TaskCardComponent,CommonModule,DragDropModule,TopBarComponent],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.css'
})
export class MyTasksComponent {
  tasks: any = {
    'to do': [],
    'in progress': [],
    'completed': []
  };

  taskStatuses:any[] = [];

  constructor(private taskService: TaskService, private taskStatusService: TaskStatusService) {}

  ngOnInit(): void {
    this.loadTaskStatuses();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      tasks.forEach( (task:any) => {
        if (this.tasks[task.status]) {
          this.tasks[task.status].push(task);
        }
      });
    });
  }

  loadTaskStatuses():void{
      this.taskStatusService.getTaskStatuses().subscribe(statuses => {
        this.taskStatuses = statuses.filter(status => status.enabled);
        this.taskStatuses.forEach(status => {
          this.tasks[status.name] = [];
        });
        this.loadTasks();
      });
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      console.log('something moved',event);
      const task = event.container.data[event.currentIndex];
      this.updateTaskStatus(task, event.container.id);
    }
  }

  updateTaskStatus(task: any, newStatus: string): void {
    task.status = newStatus;
    this.taskService.updateTask(task._id, task).subscribe();
  }
  
}
