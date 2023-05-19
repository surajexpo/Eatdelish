import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { WindowService } from 'src/app/window.service';
import { BuyerUserService } from 'src/app/services/buyer-user.service';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-buyer-login',
  templateUrl: './buyer-login.component.html',
  styleUrls: ['./buyer-login.component.css'],
})
export class BuyerLoginComponent implements OnInit {
  mobNumberPattern = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$';
  checkcaptcha: boolean = true;
  reloadcaptcha: boolean = false;
  otpMsg = '';
  msg = '';
  phone = '';
  otp = '';
  windowRef: any = '';
  validateSendOtp: boolean = false;
  userName = '';
  userUid = '';
  constructor(
    private windowService: WindowService,
    public afAuth: AngularFireAuth,
    private user: BuyerUserService,
    public router: Router
  ) {
    this.windowRef = this.windowService.windowRef;
  }
  reloadCurrentPage() {
    window.location.reload();
  }
  ngOnInit(): void {
    try {
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'normal',
          callback: (response: any) => {
            this.checkcaptcha = false;
          },
        }
      );
      this.windowRef.recaptchaVerifier.render();
    } catch (e) {
      console.log(e);
      this.reloadcaptcha = true;
      console.log(
        'There was a problem in initializing the recapctha verifier: ' + e
      );
    }
  }
  phoneMsg() {
    this.user.checkForExistingUser(this.phone).then((querySnapshot) => {
      if (querySnapshot.size == 0) {
        this.msg = 'user does not exist ';
      } else {
        this.msg = '';
        this.validateSendOtp = true;
      }
    });
  }
  login() {
    if (this.validateSendOtp) {
      this.sendOTP();
    }
    console.log('chala123');
    console.log(this.phone);
  }
  sendOTP() {
    console.log('chala');
    firebase
      .auth()
      .signInWithPhoneNumber(this.phone, this.windowRef.recaptchaVerifier)
      .then((confirmationResult) => {
        console.log(this.phone);
        console.log(confirmationResult);
        this.windowRef.confirmationResult = confirmationResult;
        this.msg = 'OTP has been sent on your mobile number';
        $(function () {
          $('#step1').hide();
        });
        $(function () {
          $('#step2').show();
        });
      })
      .catch((error) => {
        this.otpMsg = error;
        console.log(error);
      });
  }
  inputOtp() {
    this.otpMsg = '';
    this.msg = '';
  }
  verifyOTP() {
    console.log(this.otp);
    this.windowRef.confirmationResult
      .confirm(this.otp)
      .then((res: any) => {
        console.log(res);
        try {
          console.log('login res.uid', res.uid);
          sessionStorage.setItem('uid',res.uid)
          console.log('login phone', this.phone);
          this.msg = 'Login successful';
          
            this.router.navigate(['/']);
         
        } catch (e) {
          console.log(e);
        }
        //const user = result.user;
        // ...
      })
      .catch((error: any) => {
        this.otpMsg = 'incorrect OTP';
        console.log(error);
      });
  }
}
