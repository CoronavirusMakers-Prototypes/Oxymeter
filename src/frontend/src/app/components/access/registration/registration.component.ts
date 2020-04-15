import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@services/global/global.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { MyErrorStateMatcher } from '@class/MyErrosStateMatcher';
import { Router } from '@angular/router';
import { User } from '@app/class/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  formData = {
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    professional_id: new FormControl('', [Validators.required, Validators.minLength(4)]),
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    id_hospital: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,  Validators.minLength(6)]),
    rpassword: new FormControl('', [Validators.required,  Validators.minLength(6)])
  };
  hospitals: any[];

  constructor(public globalService: GlobalService,
              public router: Router) { }

  ngOnInit(): void {
    if (this.globalService.authService.isAuthenticated()){
      this.router.navigate([`/alarms`]);
    }
    this.globalService.setLoading(true);
    this.globalService.hospitalService.getHospitals().then( hospitals => {
      this.hospitals = hospitals;
      this.globalService.setLoading(false);
    }).catch(error => {
      this.globalService.setLoading(false);
    });
  }

  getErrorMessagePassword = () => {
    if (this.formData.password.value.length < 6 || this.formData.rpassword.value.length < 6){
      return 'pages.login.passwords-min-length';
    }else if (this.formData.password.value !== this.formData.rpassword.value){
      return 'pages.login.passwords-must-match';
    }
    return '';
  }

  disableRegistration = () => {
    let disable = false;
    Object.keys(this.formData).forEach(k => {
      if (!this.formData[k].valid) {
        disable = true;
      }
    });
    if ( this.formData.password.value !== this.formData.rpassword.value ){
      disable = true;
    }
    return disable;
  }

  registerUser = () => {
    this.globalService.setLoading(true);
    const data = {
      surname: this.formData.surname.value,
      lastname: this.formData.lastname.value,
      professional_id: this.formData.professional_id.value,
      login: this.formData.login.value,
      id_hospital: this.formData.id_hospital.value,
    };
    this.globalService.authService.registerUser(new User(data), this.formData.password).then((response) => {
      console.log(response);
      this.globalService.setLoading(false);
      if (response && response.getId()){
        this.router.navigate([`/alarms`]);
     }
    }, error => {
      console.log(error);
      this.globalService.setLoading(false);
      this.globalService.utils.openSimpleDialog('error.server-error')
    });
  }

}
