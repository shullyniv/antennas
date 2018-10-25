import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { AntennasService } from 'src/app/antennas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService,public antennasService:AntennasService, private router: Router) { }

  ngOnInit() {

  }
  logOut(){
    console.log("!!!!!!!!")
    this.userService.user=null;
    localStorage.removeItem('userToken');
  }
}
