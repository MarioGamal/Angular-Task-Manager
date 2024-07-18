import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  providers:[],
  imports:[FormsModule,ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm : FormGroup;

  constructor(private authService:AuthService, private router:Router, private fb:FormBuilder){
    this.signUpForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      username:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,Validators.minLength(6)]]
    },{Validators:this.passwordMatchValidator});
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value
      ? null : { 'mismatch': true };
  }

  onSignUp() {

    

    if (this.signUpForm.invalid) {
      return;
    }

    const user=this.signUpForm.value;
    console.log('Sign up triggered',user);
    
    this.authService.signUp(user).subscribe({
      next : (response) =>{
        console.log('User signed up successfully', response);
        this.router.navigate(['/sign-in']);
      },
      error : (error) => {
        console.error('Error signing up', error);
      }
    });
  }
}
