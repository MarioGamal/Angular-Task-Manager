import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() task: any;
  editTaskForm : FormGroup;
  
  constructor(private fb:FormBuilder, private taskService:TaskService, private modalService: NgbModal){
    this.editTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  openEditModal(content: any): void {
    this.editTaskForm.setValue({
      title: this.task.title,
      description: this.task.description,
      dueDate: this.task.dueDate
    });
    this.modalService.open(content, { ariaLabelledBy: 'editTaskModalLabel' });
  }

  updateTask(modal: any): void {
    if (this.editTaskForm.valid) {
      const updatedTask = this.editTaskForm.value;
      this.taskService.updateTask(this.task._id, updatedTask).subscribe(
        {
          next:(task:any)=>{
            this.task.title = task.title;
            this.task.description = task.description;
            this.task.dueDate = task.dueDate;
            modal.close();
          },
          error:(err:any)=>{
            console.log(err);
          }
        })
      };
    }
  }

