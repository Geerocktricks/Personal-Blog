import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'flash-messages-angular';

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

  constructor(private validateservice: ValidateService, private flash: FlashMessagesService) { }

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

    // Clear out the form
    this.name = '';
    this.username = '';
    this.email = '';
    this.password = '';
  }

}
