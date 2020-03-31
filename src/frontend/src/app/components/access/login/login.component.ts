import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication/authentication.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { MyErrorStateMatcher } from '@class/MyErrosStateMatcher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  formData = {
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(9)])
  };

  constructor(private authService: AuthenticationService, public router: Router) { }

  ngOnInit(): void {
  }

  disableLogin = () => !this.formData.username.valid || !this.formData.password.valid;

  login() {
    this.authService.login(this.formData.username.value, this.formData.password.value).then( result => {
      if(result && result.getId()){
         this.router.navigate([`/home`]);
      }
    }).catch(error => {
      console.log(error);
    });
  }

}
 