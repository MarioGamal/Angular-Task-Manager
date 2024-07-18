import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule,CommonModule,RouterOutlet],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm : FormGroup;

  constructor(private authService:AuthService, private router:Router,private fb : FormBuilder){
    this.signInForm = this.fb.group({
      username : ['',Validators.required],
      password : ['',[Validators.required,Validators.minLength(6)]]
    })
  }

  onSignIn(){
    if (this.signInForm.invalid) {
      return;
    }

    
    const credentials = this.signInForm.value;
    console.log('User signing in',credentials);


    this.authService.signIn(credentials)
    .subscribe({
      next:(response) =>{
        localStorage.setItem('token',response.token);
        console.log('directing to dashboard');
        this.router.navigate(['/dashboard']);
      },
      error: (error) =>{
        console.log('Error Signing In ', error);
      }
    })
  }
}
