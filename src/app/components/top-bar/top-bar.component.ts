import { Component } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  dayOfWeek:string = '';
  date:string='';

  ngOnInit():void{
    this.setDateInfo();
  }


  setDateInfo(): void {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    this.date = today.toLocaleDateString('en-US', options);
  }

}
