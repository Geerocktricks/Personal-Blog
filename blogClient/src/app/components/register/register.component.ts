import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name!: string;
  username!: string;
  email!: string;
  password!: string;

  constructor(private validateservice: ValidateService, private flash: FlashMessagesService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitForm(): any {
    // Create a new user object
    const newUser = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    // required fields
    if(!this.validateservice.validateUserRegister(newUser)) {
      this.flash.show('All fields are required!', {cssClass: 'alert-danger'});
      return false;
    }

    // validate email
    if(!this.validateservice.validateEmail(newUser.email)) {
      this.flash.show('Please use a valid email', {cssClass: 'alert-danger'});
      return false;
    }

    // Register a user
    this.auth.registerUser(newUser)
    .subscribe(user => {
      if(user.success) {
        this.flash.show(`${user.msg}`, {cssClass: 'alert-success'});
        this.router.navigate(['/login']);
      } else {
        this.flash.show(`${user.msg}`, {cssClass: 'alert-danger'});
        this.router.navigate(['/register']);
      }
    });


    // Clear out the form
    this.name = '';
    this.username = '';
    this.email = '';
    this.password = '';
  }

}
