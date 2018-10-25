import { Component, OnInit } from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.css']
})
export class ManagmentComponent implements OnInit {
  register: boolean;
  //  path:any = require("../../../assets/images/antenna.png");
    imagePath="../../../assets/images/antenna.png";
    login=false;  
  visible=false;
  display: boolean = false;
  
      showDialog(dialog) {
        if(dialog=="login")
        {this.login=true;
          this.register=false}
        else
        {this.register=true;
        this.login=false;}
          this.display = true;
      }
  constructor(private userService:UserService) { 
  }

  ngOnInit() {
  }
  addLogin(){debugger
    this.login=true;
  }
cancel(e){
  debugger
  this.login=false;
}
aaa(){
  if(this.userService.showSpinner)
  return true;
  return false;
}
}
