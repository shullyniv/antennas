
import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { User } from "../../user";
import { UserService } from "../../user.service";
import { Router } from "@angular/router";
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [MessageService]
})
export class LoginComponent {
    showError: boolean;
    submitted: boolean = false;
    userform: any;
    myuser: User;
    helper: User;
    users: User[];
    @Output()
    canceled: EventEmitter<any> = new EventEmitter();
    // public selectedP: Recipe;
    flagPass: boolean;
    constructor(private fb: FormBuilder, private messageService: MessageService, private userService: UserService, private router: Router, private confirmationService: ConfirmationService) {
        this.myuser = new User();
    }
    ngOnInit() {
        this.userform = this.fb.group({
            'mail': new FormControl('', Validators.compose([Validators.required, Validators.email])),
            'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        });

    }

    confirm() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                //Actual logic to perform a confirmation
            }
        });
    }
    onSubmit() {
        this.submitted = true;
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
        this.userService.loginUser({ password: this.myuser.password, email: this.myuser.Email }).then(res => { this.router.navigate(['/Menu']); }).catch(error => {

                this.flagPass = false;
                this.showError=true;
                this.router.navigate(['/NotFound']);
            });
    }
    cancel() {
        this.router.navigate([''])
        this.canceled.emit(null);
    }

    get diagnostic() { return JSON.stringify(this.userform.value); }


}


