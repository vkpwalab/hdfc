import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  fp_form: FormGroup;
  loading: boolean;
  err: boolean;
  constructor(private router: Router, private fb: FormBuilder, private shared: SharedService) { }

  ngOnInit(): void {
    if (localStorage.getItem('auth-token')) {
      this.router.navigate(['dashboard']);
    }
    this.fp_form = this.fb.group(
      {
        'email': ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      }
    )
  }

  forgetPassword(data) {
    let body_login = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                        <soapenv:Header/>
                        <soapenv:Body>
                          <tem:Forgot_Password>
                              <!--Optional:-->
                              <tem:I_UserID>${data.email}</tem:I_UserID>
                              <!--Optional:-->
                              <tem:I_IP>?</tem:I_IP>
                          </tem:Forgot_Password>
                        </soapenv:Body>
                    </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Forgot_Password';
    let result_tag = 'Forgot_PasswordResult';
    this.shared.getData(soapaction, body_login, result_tag).subscribe(
      (data) => {
        console.log(data);
        if (data.o_msg == 'Success') {
          this.loading = false;
        } else {
          this.loading = false;
          this.err = true;
        }
      }
    );
  }

}
