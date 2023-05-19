import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { WindowService } from 'src/app/window.service';
import firebase from 'firebase';
import { BuyerUserService } from 'src/app/services/buyer-user.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-buyer-signup',
  templateUrl: './buyer-signup.component.html',
  styleUrls: ['./buyer-signup.component.css'],
})
export class BuyerSignupComponent implements OnInit {
  // mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  mobNumberPattern = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$';
  checkcaptcha: boolean = true;
  reloadcaptcha: boolean = false;
  otpMsg: string = '';
  msg: string = '';
  validateSendOtp: boolean = false;
  windowRef: any = '';
  signUp = {
    phoneNumber: '',
    fullName: '',
    emailId: '',
    userType: 'Buyer',
    otpVerified: '',
    uid: '',
  };
  otp = '';
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
      this.reloadcaptcha = true;
      console.log(
        'There was a problem in initializing the recapctha verifier: ' + e
      );
    }
  }
  onlyText(e:any) {
    var inp = String.fromCharCode(e.keyCode);
    if (/^[a-z ,.'-]+$/i.test(inp)) {
     
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }
  phoneMsg() {
    this.user
      .checkForExistingUser(this.signUp.phoneNumber)
      .then((querySnapshot) => {
        if (querySnapshot.size == 0) {
          this.msg = '';
          this.validateSendOtp = true;
        } else {
          this.msg = 'user already sign up';
        }
      });
  }
  checkFirst() {
    if (this.validateSendOtp) {
      this.sendOTP();
      this.msg = '';
      this.otpMsg = '';
    }
  }
  sendOTP() {
    console.log('chala');
    firebase
      .auth()
      .signInWithPhoneNumber(
        this.signUp.phoneNumber,
        this.windowRef.recaptchaVerifier
      )
      .then((confirmationResult) => {
        console.log(this.signUp.phoneNumber);
        console.log(JSON.stringify(confirmationResult));
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
        console.log(error);
        this.otpMsg = error;
      });
  }
  inputOtp() {
    this.otpMsg = '';
    this.msg = '';
  }
  verifyOTP() {
    console.log('otp = ', this.otp);
    this.windowRef.confirmationResult
      .confirm(this.otp)
      .then((res: any) => {
        console.log(res);
        try {
          this.signUp.uid = res.user.uid;
          console.log(this.signUp);
          this.signUp.otpVerified = 'true';
          this.user.signup(this.signUp);
          localStorage.setItem('UID', this.signUp.uid);
          localStorage.setItem('buyerName', this.signUp.fullName);
          this.msg = 'SignUp success';
         
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
        // User couldn't sign in (bad verification code?)
        // ...
      });
  }
}
function jQuery(jQuery: any) {
  throw new Error('Function not implemented.');
}
export class User {
  mobileNumber?: string;
}
