import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
  }
logOut(){
  console.log("!!!!!!!!")
  this.userService.user=null;
  localStorage.removeItem('userToken');
}
}
