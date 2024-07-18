import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone:true,
  imports:[RouterModule,RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = {};

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
    // Fetch user data
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
}
