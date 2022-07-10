import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isOpen: boolean = false;

  constructor(private auth: AuthService, private router: Router, private flash: FlashMessagesService) { }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.isOpen = ! this.isOpen;
  }

  onLogoutClick() {
    this.auth.logout();
    this.flash.show('You\re now logged out!', {cssClass: 'alert-success'});
    this.router.navigate(['/login']);
    return false;
  }

}
