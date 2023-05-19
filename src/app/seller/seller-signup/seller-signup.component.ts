import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { WindowService } from 'src/app/window.service';
import firebase from 'firebase';
import { BuyerUserService } from 'src/app/services/buyer-user.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.css'],
})
export class SellerSignupComponent implements OnInit {
  mobNumberPattern = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$';
  checkcaptcha: boolean = true;
  reloadcaptcha: boolean = false;
  validateSendOtp: boolean = false;
   otpMsg: string = '';
  msg: string = '';
  windowRef: any = '';
  signUp = {
    phoneNumber: '',
    fullName: '',
    emailId: '',
    otpVerified: '',
    userType: 'Seller',
    uid: '',
  };
  otp = '';
  constructor(
    private windowService: WindowService,
    public afAuth: AngularFireAuth,
    private seller: BuyerUserService,
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
            console.log(this.checkcaptcha);
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
    this.seller
      .checkForExistingSeller(this.signUp.phoneNumber)
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
        this.otpMsg = error;
      });
  }
  inputOtp() {
    this.otpMsg = '';
    this.msg = '';
  }
  verifyOTP() {
    this.otpMsg = '';
    console.log(this.otp);
    this.windowRef.confirmationResult
      .confirm(this.otp)
      .then((res: any) => {
        console.log('user response', res);
        try {
          console.log(this.signUp);
          this.signUp.uid = res.user.uid;
          localStorage.setItem('sellerUid', this.signUp.uid);
          this.signUp.otpVerified = 'true';
          console.log('user uid', res.user.uid);
          this.seller.sellerSignup(this.signUp);
          this.msg = 'SignUp success';
        
            this.router.navigate(['/seller']);
         
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error: any) => {
        (this.otpMsg = 'incorrect OTP'), error;
        console.log(error);
      });
  }
}
function jQuery(jQuery: any) {
  throw new Error('Function not implemented.');
}
