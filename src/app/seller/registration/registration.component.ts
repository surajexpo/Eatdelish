import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { BuyerUserService } from 'src/app/services/buyer-user.service';
import * as $ from 'jquery';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [
    DatePipe,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class RegistrationComponent implements OnInit {
  photosArr: any = [];
  constructor(
    private seller: BuyerUserService,
    private af: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private user: BuyerUserService,
    public router: Router,
    public datepipe: DatePipe
  ) { }
  // uid = localStorage.getItem('Uid');
  checkRef: any;
  imgUrl = '';
  dataArr: any = [];
  selected: Date | null | undefined;
  startTime = '';
  endTime = '';
  getData() {
    let temp = this.datepipe.transform(this.selected, 'dd/MM/YYYY');
    const obj = {
      date: JSON.stringify(temp),
      startTime: this.startTime,
      endTime: this.endTime,
    };
    console.log(obj, 'objjjj');

    this.dataArr.push(obj);
    this.selected = null;
    this.startTime = '';
    this.endTime = '';
    console.log('ghghgjhfgdh', this.dataArr);
  }
  urlImg = '';
  togetUrl = '';
  docId = '';
  registration = {
    kitchenName: '',
    bestDescribe: '',
    pinCode: '',
    houseNumber: '',
    kitchenArea: '',
    landMark: '',
    townCity: '',
    countryState: '',
    kitchenDesc: '',
    nameOnAccount: '',
    accountType: '',
    routingNumber: '',
    accountNumber: '',
    countryResident: '',
    firstName: '',
    lastName: '',
    sellerDob: '',
    securityNumber: '',
    uid: '',
    followers: 0,
    following: 0,
    verified: false,
  };
  imageSrc: any;
  imageSrc1: any;
  imageSrc2: any;
  imageSrc3: any;
  imageSrc4: any;
  imageSrc5: any;
  imageSrc6: any;
  imageSrc7: any;
  imageSrc8: any;
  imageSrc9: any;
  kithenImagesData: any = [];
  kitchenPhotos: any = {
    kitchenName: this.registration.kitchenName,
    uid: this.registration.uid,
    kithenImagesDataUrls: [],
  };
  images: string[] = [];
  addFoodPhoto: any = {
    Name: '',
    RatingNumber: '',
    discription: '',
    foodType: '',
    photo: [],
    price: '',
    shopAddress: this.registration.kitchenArea,
    shopName: this.registration.kitchenName,
    foodAllergy: '',
    uid: '',
    sellerName: '',
    daysData: this.dataArr,
  };
  photos: any = [];
  checkName(name: string) {
    console.log('input box value', name);
    this.seller.checkKitchenName(name).then((querySnapshot) => {
      if (querySnapshot.size == 0) {
        $(function () {
          $('#availableShow').show();
        });
      } else {
        $(function () {
          $('#availableShow').hide();
        });
      }
    });
  }
  getFiles(event: any) {
    console.log(event.target.files, 'vikash bhayya')
    if (event.target.files && event.target.files[0]) {
      // console.log('event files', event.target.files[0]);
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
        this.photosArr.push(event.target.files[i]);
        console.log('array data', this.photosArr[i])
      }
    }
  }
  uploadData = async (id: string) => {
    for (let i = 0; i < this.photosArr.length; i++) {
      const driverPhotoFilePathUrl = 'food photo ' + this.makeid(9);
      console.log(driverPhotoFilePathUrl, 'name of files');
      console.log(this.photosArr[i], ':::::::files');

      const driver = await this.fireStorage.upload(
        driverPhotoFilePathUrl,
        this.photosArr[i]
      );
      var imgUrls: any = await driver.ref.getDownloadURL();
      console.log(imgUrls, 'imageUrl::::::::::::')
      this.addFoodPhoto.photo.push(imgUrls);
      console.log('photo data', this.addFoodPhoto)
    }
    this.user.addFood(this.addFoodPhoto);
    this.photos.push({
      photo: this.images[0],
      name: this.addFoodPhoto.Name,
    });
    console.log('add Food photo', this.addFoodPhoto);
    this.images = [];
    this.addFoodPhoto = {
      Name: '',
      RatingNumber: '',
      discription: '',
      foodType: '',
      photo: [],
      price: '',
      shopAddress: this.registration.kitchenArea,
      shopName: this.registration.kitchenName,
      foodAllergy: '',
      uid: '',
      sellerName: '',
      daysData: ([] = ''),
    };
    this.imageSrc = '';
    this.dataArr.splice(0, this.dataArr.length);
  };
  makeid(length: any) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    console.log(result, 'random generated string');
    return result;
  }
  async uploadDataaa() {
    for (let i = 0; i < this.photosArr.length; i++) {
      const driverPhotoFilePathUrl = 'food photo' + i;
      const driver = await this.fireStorage.upload(
        driverPhotoFilePathUrl,
        this.photosArr[i]
      );
      var imgUrls: any = await driver.ref.getDownloadURL();
      this.addFoodPhoto.photo.push(imgUrls);
    }
  }
  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user !== null) {
        this.registration.uid = user.uid;
        this.addFoodPhoto.uid = user.uid;
        console.log(this.registration.uid);
        console.log(this.addFoodPhoto.Name);
        this.seller.getSeller(user.uid).then((querySnapshot) => {
          console.log(querySnapshot);
          querySnapshot.forEach((element) => {
            console.log(element.data());
            this.addFoodPhoto.sellerName = element.data()['fullName'];
            console.log('fullname ', element.data()['fullName']);
            //   this.user.getVerification(element.id, this.registration.verified).then(res => {
            //     console.log(res)
            //   }).catch(err => {
            //     console.log(err);
            //   });
          });
        });
        // this.router.navigate(['/profile']);
        // console.log('login', user);
        // this.buyerUser.getData(user.uid).then((querySnapshot) => {
        //   querySnapshot.forEach((element) => {
        //     this.userName = element.data()['fullName'];
        //     this.loginUser = true;
        //     console.log('fullname ', element.data()['fullName']);
        //   });
        // });
      } else {
        // this.loginUser = false;
        console.log('logout');
      }
    });
  }
  getFile(event: any) {
    const reader = new FileReader();
    console.log('event ====> ', event.target.files[0]);
    if (event.target.files[0]) {
      this.kithenImagesData.push(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
  getFile1(event: any) {
    const reader = new FileReader();
    console.log('event ====> ', event.target.files[0]);
    if (event.target.files[0]) {
      this.kithenImagesData.push(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc1 = reader.result as string;
      };
    }
  }
  getFile2(event: any) {
    const reader = new FileReader();
    console.log('event ====> ', event.target.files[0]);
    if (event.target.files[0]) {
      this.kithenImagesData.push(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc2 = reader.result as string;
      };
    }
  }
  getFile3(event: any) {
    const reader = new FileReader();
    console.log('event ====> ', event.target.files[0]);
    if (event.target.files[0]) {
      this.kithenImagesData.push(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc3 = reader.result as string;
      };
    }
  }
  getFile4(event: any) {
    const reader = new FileReader();
    console.log('event ====> ', event.target.files[0]);
    if (event.target.files[0]) {
      this.kithenImagesData.push(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc4 = reader.result as string;
      };
    }
  }
  getFile5(event: any) {
    const reader = new FileReader();
    console.log('event ====> ', event.target.files[0]);
    if (event.target.files[0]) {
      this.kithenImagesData.push(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc5 = reader.result as string;
      };
    }
  }
  getFile6(event: any) {
    const reader = new FileReader();
    console.log('event ====> ', event.target.files[0]);
    if (event.target.files[0]) {
      this.kithenImagesData.push(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc6 = reader.result as string;
      };
    }
  }
  getFile7(event: any) {
    const reader = new FileReader();
    console.log('event ====> ', event.target.files[0]);
    if (event.target.files[0]) {
      this.kithenImagesData.push(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc7 = reader.result as string;
      };
    }
  }
  getFile8(event: any) {
    const reader = new FileReader();
    console.log('event ====> ', event.target.files[0]);
    if (event.target.files[0]) {
      this.kithenImagesData.push(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc8 = reader.result as string;
      };
    }
  }
  getFile9(event: any) {
    const reader = new FileReader();
    console.log('event ====> ', event.target.files[0]);
    if (event.target.files[0]) {
      this.kithenImagesData.push(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc9 = reader.result as string;
      };
    }
  }
  checkAvailable = 'Available';
  check() {
    console.log('jj', this.registration.bestDescribe);
    console.log('jk', this.registration.kitchenName);
  }
  checkForm() {
    console.log('Registration values', this.registration);
    this.user.setRegistration(this.registration);
  }
  next() {
    $(function () {
      $('#step1').hide();
    });
    $(function () {
      $('#step2').show();
    });
  }
  prev() {
    $(function () {
      $('#step1').show();
    });
    $(function () {
      $('#step2').hide();
    });
  }
  async nextAfterImagesUpload() {
    // const driverPhotoFilePathUrl = '/files' + Date.now() + this.togetUrl;
    console.log('this image to upload ===> ', this.kithenImagesData);
    for (let i = 0; i < this.kithenImagesData.length; i++) {
      const driverPhotoFilePathUrl = 'kithcenImageNo' + i;
      const driver = await this.fireStorage.upload(
        driverPhotoFilePathUrl,
        this.kithenImagesData[i]
      );
      var imgUrls: any = await driver.ref.getDownloadURL();
      // this.kithenImagesDataUrls.push(imgUrls);
      // console.log('urls ===> ', this.kithenImagesDataUrls);
      this.registration.verified = true;
      this.kitchenPhotos.kithenImagesDataUrls.push(imgUrls);
    }
    // this.af.collection('kitchenPhotos').add(this.kitchenPhotos).then((res) => {
    //   console.log('data inserted in kitchen Photos', res)
    // })

    console.log(this.registration.kitchenName);
    this.seller
      .toreachKitchenInfo(this.registration.kitchenName)
      .then((res) => {
        console.log('THIS IS THE', res);
        res.forEach((data) => {
          console.log(data.id);
          this.docId = data.id;
        });
        this.seller
          .getVerification(this.docId, this.registration.verified)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });

    $(function () {
      $('#step1').hide();
    });
    $(function () {
      $('#step2').show();
    });
  }
  checkthis() {
    // console.log("CHECK",this.addFoodPhoto.Name)
  }
  status() {
    console.log('status', this.addFoodPhoto);
  }
}
