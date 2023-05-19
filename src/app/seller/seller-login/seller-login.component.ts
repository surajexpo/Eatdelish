import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { WindowService } from 'src/app/window.service';
import { BuyerUserService } from '../../services/buyer-user.service';
import firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css'],
})
export class SellerLoginComponent implements OnInit {
  mobNumberPattern = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$';
  checkcaptcha: boolean = true;
  reloadcaptcha: boolean = false;
  validateSendOtp: boolean = false;
  otpMsg: string = '';
  msg = '';
  phone = '';
  otp = '';
  windowRef: any = '';
  sendMsg: string ='';
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
  phoneMsg() {
    this.seller.checkForExistingSeller(this.phone).then((querySnapshot) => {
      if (querySnapshot.size == 0) {
        this.msg = 'user does not exist please signup first';
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
        this.sendMsg = 'OTP has been sent on your mobile number';
        $(function () {
          $('#step1').hide();
        });
        $(function () {
          $('#step2').show();
        });
      })
      .catch((error) => {
        this.msg = error;
        console.log(error);
      });
  }
  inputOtp() {
    this.otpMsg = '';
    this.msg = '';
  }
  verifyOTP() {
    this.msg = '';
    console.log(this.otp);
    this.windowRef.confirmationResult
      .confirm(this.otp)
      .then((res: any) => {
        console.log(res);

        try {
          console.log(this.phone);
          // localStorage.setItem("Uid",res.user.uid);
          // console.log('uid has been saved in local storage',res.user.uid);
          this.msg = 'Login successful';
          this.router.navigate(['/seller']);

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
