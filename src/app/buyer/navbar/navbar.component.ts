import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { FoodService } from '../../Services/food.service';
import 'firebase/auth';
import 'firebase/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { BuyerUserService } from 'src/app/services/buyer-user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  tempName = '';
  tempPhone = '';
  docId = '';
  imgUrl = '';
  uploadButton = false;
  image: any = '../../../assets/images/user.png';
  urlImg = '';
  togetUrl = '';
  foodID: any;
  foodInCart: number = 0;
  userUid: any;
  userName: string = '';
  userType: string = '';
  loginUser: any;
  logoutMsg = '';
  phoneNumber = '';
  constructor(
    private food: FoodService,
    public afAuth: AngularFireAuth,
    private buyerUser: BuyerUserService,
    private fireStorage: AngularFireStorage,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.addTocart();
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        console.log('login', user);
        this.buyerUser.getData(user.uid).then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            this.docId = element.id
            this.userType = element.data()['userType'];
            if (this.userType == 'Buyer') {
              this.userName = element.data()['fullName'];
              this.loginUser = true;
              this.phoneNumber = element.data()['phoneNumber'];
            }
            console.log('fullname', element.data()['fullName']);
          });
        });
      } else {
        this.loginUser = false;
        console.log('logout');
      }
    });
  }

  userLogout() {
    this.afAuth.signOut().then(() => {
      this.logoutMsg = 'Logout Successful';
      this.loginUser = false;
      this.router.navigate(['/']);

      sessionStorage.clear();
    });

    setInterval(function () { }, 1000);
  }
  async addTocart() {
    // this.foodID = await (await this.food.getUserByID()).data();
    // this.foodInCart = this.foodID.cart.length
    // console.log(this.foodInCart, "in navbar");
  }
  onImageSelect(e: any) {
    this.urlImg = e.target.files[0];
    console.log(this.urlImg)
    this.togetUrl = e.target.files[0].name;
    console.log(this.togetUrl)
    const reader = new FileReader();
    console.log('event ====> ', e.target.files[0]);
    if (e.target.files[0]) {
      //this.kithenImagesData.push(event.target.files[0])
      reader.readAsDataURL(e.target.files[0]);
      console.log(reader)
      reader.onload = () => {
        localStorage.setItem("profilePic", this.image)
        this.image = reader.result as string;
        this.uploadButton = true;
        console.log(this.image)
      }
    }
  }
  cancelUpload() {
    this.image = localStorage.getItem("profilePic")
    localStorage.removeItem("profilePic");
    this.uploadButton = false;
  }
  uploadData = async (id: string) => {
    const driverPhotoFilePathUrl = '/files' + Date.now() + this.togetUrl;
    const driver = await this.fireStorage.upload(
      driverPhotoFilePathUrl,
      this.urlImg
    );
    localStorage.removeItem("profilePic");
    this.imgUrl = await driver.ref.getDownloadURL();
    this.image = this.imgUrl;
    console.log('This is imgUrl', this.imgUrl);
    this.uploadButton = false;
  };
  submitUpdate() {
    if (this.userName != this.tempName && this.tempName.length > 3) {
      this.buyerUser.updateBuyerName(this.docId, this.tempName).then((res) => {
        this.userName = this.tempName
        console.log(this.userName)
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    }
    if (this.phoneNumber != this.tempPhone && this.tempPhone.length > 3) {
      this.buyerUser.updateBuyerName(this.docId, this.tempPhone).then((res) => {
        this.phoneNumber = this.tempPhone
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
