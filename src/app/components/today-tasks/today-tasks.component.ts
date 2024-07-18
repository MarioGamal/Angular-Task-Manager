import { Component } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-today-tasks',
  standalone: true,
  imports: [TaskCardComponent, CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './today-tasks.component.html',
  styleUrl: './today-tasks.component.css'
})
export class TodayTasksComponent {
  dayOfWeek: string = '';
  date: string = '';
  todayLongDate: string = '';
  todayDate : string = this.formatDate(new Date());
  todayTasks: any[] = [];
  addTaskForm: FormGroup;

  constructor(private taskService:TaskService, private fb : FormBuilder, private modalService : NgbModal){
    this.addTaskForm = this.fb.group({
      title : ['',Validators.required],
      description : ['',Validators.required],
      dueDate:['',Validators.required]
    })
  }

  ngOnInit():void{
    this.loadTodayTasks();
    this.setDateInfo();
  }

  loadTodayTasks():void{
    this.taskService.getTasks('to do',this.todayLongDate).subscribe({
      next:(tasks)=>{
        console.log('to do tasks', tasks);
        this.todayTasks = tasks;
      },
      error:(error)=>{
        console.log(error);
      }
      
    })
  }

  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'addTaskModalLabel' });
  }

  formatDate (date:Date) : string{
    let day = date.getDay();
    let month = date.getMonth();
    const monthNames = ["Jan", "Feb", "Mar", "Apr",
                        "May", "Jun", "Jul", "Aug",
                        "Sep", "Oct", "Nov", "Dec"];
    let monthName = monthNames[month];
    return `${day} ${monthName}`;
  }

  setDateInfo():void{
    const today= new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    this.date = today.toLocaleDateString('en-US', options);
    this.todayLongDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
  }


  saveTask(modal:any):void{
    if(this.addTaskForm.valid){
      
      const newTask = this.addTaskForm.value;
      console.log('saving task',newTask);
      this.taskService.addTask(newTask).subscribe({
        next:(task) => {
          this.todayTasks.push(task);
          this.addTaskForm.reset();
          modal.close();

        }
      })
    }
  }
}
