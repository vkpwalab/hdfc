import { Component, OnInit } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
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
  captcha: string;
  loginSlider:any;

  constructor(private router: Router, private login_fb: FormBuilder, private shared: SharedService) { }

  ngOnInit() {
    // if (localStorage.getItem('auth-token')) {
    //   this.router.navigate(['dashboard']);
    // }
    this.login_form = this.login_fb.group(
      {
        'email': ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
        'password': ['', [Validators.required]],
        'captcha': ['', [Validators.required]],
      }
    )

    this.generateCaptcha();
    this.getLoginSliderData()
  }

  // login(form_data) {
  //   console.log(form_data);

  //   this.authBuilder(form_data);

  //   if (this.login_form.valid) {
  //     if(this.captcha === form_data.captcha){
  //       this.loading = true;
  //       let body_login = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
  //                             <soapenv:Header/>
  //                             <soapenv:Body>
  //                               <tem:p_get_token>
  //                                   <!--Optional:-->
  //                                   <tem:i_user>${form_data.email}</tem:i_user>
  //                                   <!--Optional:-->
  //                                   <tem:i_password>${form_data.password}</tem:i_password>
  //                               </tem:p_get_token>
  //                             </soapenv:Body>
  //                         </soapenv:Envelope>`;

  //       let soapaction = 'http://tempuri.org/IService1/p_get_token';
  //       let result_tag = 'p_get_tokenResult';
  //       this.shared.getData(soapaction, body_login, result_tag).subscribe(
  //         (data) => {
  //           if (data.Status == 'Y') {
  //             this.token = data.Token;
  //             localStorage.setItem('auth-token', this.token);
  //             localStorage.setItem('from_login', 'yes');
  //             this.getBuilderID(form_data.email);
  //           }else{
  //             this.loading = false;
  //             this.err = true;
  //           }
  //         }
  //       );
  //     }
  //     else{
  //       alert('Please enter correct captcha');
  //       this.generateCaptcha();
  //     }
  //   }

  //   // location.reload();
  // }

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
        console.log(user);
        localStorage.setItem('builder_id', user.BUILDER_ID);
        localStorage.setItem('username', user.USERNAME);
        this.loading = false;
        this.router.navigate(['dashboard']);
      }
    );
  }

  generateCaptcha() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let index = 0; index < 6; index++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    this.captcha = text;
  }

  login(form_data) {
    if (this.login_form.valid) {
      if (this.captcha === form_data.captcha) {
        this.loading = true;
        let body_login = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                              <soapenv:Header/>
                              <soapenv:Body>
                                <tem:authBuilderUser>
                                    <!--Optional:-->
                                    <tem:i_userid>${form_data.email}</tem:i_userid>
                                    <!--Optional:-->
                                    <tem:i_password>${this.shared.encryptUsingAES256(form_data.password)}</tem:i_password>
                                </tem:authBuilderUser>
                              </soapenv:Body>
                          </soapenv:Envelope>`;

        let soapaction = 'http://tempuri.org/IService1/authBuilderUser';
        let result_tag = 'authBuilderUserResult';
        this.shared.getData(soapaction, body_login, result_tag).subscribe(
          (data) => {
            if (data.o_msg == 'Success') {
              console.log(data);
              this.token = data.o_token;
              localStorage.setItem('auth-token', this.token);
              localStorage.setItem('from_login', 'yes');
              localStorage.setItem("login_time", "1");
              this.getBuilderID(form_data.email);
            } else {
              this.loading = false;
              this.err = true;
            }
          }
        );
      }
      else {
        alert('Please enter correct captcha');
        this.generateCaptcha();
      }
    }

    // location.reload();
  }

  getLoginSliderData() {
   
    let body_government_link = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:GET_LINK_DETAILS>
                                        <!--Optional:-->
                                        
                                        <!--Optional:-->
                                        <tem:I_LINK_TYPE>LP_LINK</tem:I_LINK_TYPE>
                                        <!--Optional:-->
                                        <tem:Token></tem:Token>
                                    </tem:GET_LINK_DETAILS>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GET_LINK_DETAILS';
    let result_tag = 'GET_LINK_DETAILSResult';
    
    this.shared.getData(soapaction, body_government_link, result_tag).subscribe(
      (data) => {
        this.loginSlider = data.Table;
        console.log(this.loginSlider)
      },
      (error)=>{
        console.log(error)
      }
    );

  }
}
