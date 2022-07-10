import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesModule, FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: String;

  constructor(private auth: AuthService, private router: Router, private flash: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onSubmitLogin() {
    const newUser = {
      username: this.username,
      password: this.password
    }

    this.auth.authenticateUser(newUser)
    .subscribe(data => {
      if(data.success) {
        this.auth.storeUserData(data.token, data.user)
        this.flash.show(`You are now logged in`, {cssClass: 'alert-success'});
        this.router.navigate(['/']);

      } else {
        this.flash.show(`${data.msg}`, {cssClass: 'alert-danger'});
        this.router.navigate(['/login']);
      }
    })

    // Clear the form
    this.username = '';
    this.password = '';
  }

}
