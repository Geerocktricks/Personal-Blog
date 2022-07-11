import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: UserInterface;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.getProfile().subscribe(profileData => {
      this.user = profileData.user;
    },
    err => {
      console.error(err)
    })
  }

}