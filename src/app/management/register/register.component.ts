import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import {User} from "../../user";
import { UserService} from "../../user.service";
import { Router } from "@angular/router";
import {ButtonModule} from 'primeng/button';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    userform: any;

    myUser: User;

    constructor(private fb: FormBuilder, private messageService: MessageService,private UserService: UserService, private router: Router) {
        this.myUser = new User();
    }
    
    onSubmit()
    {   
        this.UserService.add(this.myUser).add(res => {this.router.navigate(['/Menu'])});
    }
ngOnInit(){
    this.userform = this.fb.group({

        'firstname': new FormControl('', Validators.required),
        'lastname': new FormControl('', Validators.required),
        'mail': new FormControl('', Validators.compose([Validators.required, Validators.email])),
        'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    }); 
}

}