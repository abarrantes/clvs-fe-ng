import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private userService:UserService){}

  theUserFromUser:any = {};
  
  ngOnInit() {
    this.userService.theUserEmitter.subscribe(res=>{this.theUserFromUser=res})
  }
}