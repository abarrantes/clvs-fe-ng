import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private userService:UserService){}

  thisFormShowing:any;

  
  // toggleLogin(){
  //   this.userService.toggleLogin()
  // }
  
  
  ngOnInit() {
    this.userService.checkLogin
    this.userService.loginFormShowing.subscribe(res=>{this.thisFormShowing=res})
  }
}