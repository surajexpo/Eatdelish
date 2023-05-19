import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { BuyerUserService } from 'src/app/services/buyer-user.service';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  loginSeller: any;

  constructor(private router: Router, public afAuth: BuyerUserService) {}

  ngOnInit(): void {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user !== null) {
  //       this.loginSeller = true;
  //       console.log('login', user);
  //     } else {
  //       this.loginSeller = false;
  //       console.log('logout');
  //     }
  //   });
  }
  // userLogout() {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       this.loginSeller = false;
  //       sessionStorage.clear();
  //       this.router.navigate(['/']);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
}
