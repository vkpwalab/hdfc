import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  login_form: FormGroup;
  token: any;
  loading: boolean;
  err: boolean;


  constructor(private router: Router, private login_fb: FormBuilder, private shared: SharedService) { }

  ngOnInit() {
    if (localStorage.getItem('auth-token')) {
      this.router.navigate(['dashboard']);
    }
    this.login_form = this.login_fb.group(
      {
        'email': ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
        'password': ['', [Validators.required]],
      }
    )
  }

  login(form_data) {
    console.log(form_data);
    if (this.login_form.valid) {
      this.loading = true;
      let body_login = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                            <soapenv:Header/>
                            <soapenv:Body>
                              <tem:authBuilderUser>
                                  <!--Optional:-->
                                  <tem:i_userid>${form_data.email}</tem:i_userid>
                                  <!--Optional:-->
                                  <tem:i_password>${form_data.password}</tem:i_password>
                              </tem:authBuilderUser>
                            </soapenv:Body>
                        </soapenv:Envelope>`;

      let soapaction = 'http://tempuri.org/IService1/authBuilderUser';
      let result_tag = 'authBuilderUserResult';
      this.shared.getData(soapaction, body_login, result_tag).subscribe(
        (data) => {
          if (data.o_msg == 'Success') {
            this.token = data.o_token;
            localStorage.setItem('auth-token', this.token);
            localStorage.setItem('from_login', 'yes');
            this.getBuilderID(form_data.email);
          }else{
            this.loading = false;
            this.err = true;
          }
        }
      );
    }

    // location.reload();
  }

  getBuilderID(email) {
    let body_login = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                        <soapenv:Header/>
                        <soapenv:Body>
                          <tem:getUserDetails>
                              <!--Optional:-->
                              <tem:i_user_id>${email}</tem:i_user_id>
                              <!--Optional:-->
                              <tem:Token>${this.token}</tem:Token>
                          </tem:getUserDetails>
                        </soapenv:Body>
                    </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/getUserDetails';
    let result_tag = 'getUserDetailsResult';
    this.shared.getData(soapaction, body_login, result_tag).subscribe(
      (data) => {
        let user = data.Table[0];
        localStorage.setItem('builder_id', user.BUILDER_ID);
        this.loading = false;
        this.router.navigate(['dashboard']);
      }
    );
  }
}
