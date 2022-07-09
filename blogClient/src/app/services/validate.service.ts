import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateUserRegister(user: UserInterface) {
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
        return false
    } else {
      return true
    }
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email)
  }
}
