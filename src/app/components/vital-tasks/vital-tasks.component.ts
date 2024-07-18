import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { VitalTodosComponent } from '../vital-todos/vital-todos.component';

@Component({
  selector: 'app-vital-tasks',
  standalone: true,
  imports: [NavbarComponent,TopBarComponent,CommonModule,VitalTodosComponent],
  templateUrl: './vital-tasks.component.html',
  styleUrl: './vital-tasks.component.css'
})
export class VitalTasksComponent {

}
