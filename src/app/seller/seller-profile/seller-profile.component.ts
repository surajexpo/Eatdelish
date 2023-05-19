import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { BuyerUserService } from 'src/app/services/buyer-user.service';
import { FoodService } from 'src/app/Services/food.service'
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {
  docId = '';
  updateKitchenUpdate = {
    kitchenName: '',
    kitchenArea: '',
    kitchenLandmark: '',
    kitchenNumber: '',
    kitchenState: '',
    kitchenDesc: '',
    kitchenCity: ''
  }
  uploadCover = false;
  uploadButton = false;
  image: any = '../../../assets/images/111.png';
  coverImage: any = '../../../assets/images/Rectangle 218.png';
  imgUrl = '';
  urlImg = '';
  togetUrl = '';
  about: any = ""
  aboutTrue = false;
  kitchenInfo = {
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
    verified: false
  };
  addFoodPhoto = {
    Name: '',
    RatingNumber: '',
    discription: '',
    foodType: '',
    dayAvailable: '',
    timeFrom: '',
    timeTo: '',
    photo: '',
    price: '',
    shopAddress: '',
    shopName: '',
    foodAllergy: '',
    uid: ''
  };
  photoDisplay: any = [];
  constructor(private seller: BuyerUserService,
    private foodPhoto: FoodService,
    private fireStorage: AngularFireStorage,
  ) { }
  ngOnInit(): void {
    this.foodShow()
    this.getSellerData();
  }

  viewMore() {
    // let gel = document.querySelector<HTMLElement>("gallery");
    let gel = document.querySelector<HTMLElement>('.gallery')!;
    gel.style.display = "none";
    let gel12 = document.querySelector<HTMLElement>(".gallery112")!;
    gel12.style.display = "flex";
    let gel123 = document.querySelector<HTMLElement>(".RatingReview")!;
    gel123.style.display = "none";
    let gel1234 = document.querySelector<HTMLElement>(".veiw-more")!;
    gel1234.style.display = "none";
  }
  foodShow() {
    let gel = document.querySelector<HTMLElement>(".gallery")!;
    gel.style.display = "flex";
    let gel12 = document.querySelector<HTMLElement>(".gallery112")!;
    gel12.style.display = "none";
    let gel123 = document.querySelector<HTMLElement>(".RatingReview")!;
    gel123.style.display = "none";
    let gel1234 = document.querySelector<HTMLElement>(".veiw-more")!;
    gel1234.style.display = "flex";
    let food = document.querySelector<HTMLElement>(".food")!;
    food.style.color = "#000000"
    let food12 = document.querySelector<HTMLElement>(".food12")!;
    food12.style.color = "#595959"
  }

  ratingReview() {
    let gel = document.querySelector<HTMLElement>(".gallery")!;
    gel.style.display = "none";
    let gel12 = document.querySelector<HTMLElement>(".gallery112")!;
    gel12.style.display = "none";
    let gel123 = document.querySelector<HTMLElement>(".RatingReview")!;
    gel123.style.display = "flex";
    let gel1234 = document.querySelector<HTMLElement>(".veiw-more")!;
    gel1234.style.display = "none";
    let food = document.querySelector<HTMLElement>(".food")!;
    food.style.color = "#595959"
    let food12 = document.querySelector<HTMLElement>(".food12")!;
    food12.style.color = "#000000"
  }
  editAbout() {
    this.aboutTrue = !this.aboutTrue
  }
  getSellerData() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user !== null) {
        this.seller.getSellerInfo(user.uid).then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log('amaaan document id =====> ', doc.id);
            this.docId = doc.id;
            this.addFoodPhoto.uid = doc.data()['uid'];
            // console.log(doc.data())
            this.kitchenInfo.kitchenName = doc.data()['kitchenName'];
            this.kitchenInfo.firstName = doc.data()['firstName'];
            this.kitchenInfo.lastName = doc.data()['lastName'];
            this.kitchenInfo.houseNumber = doc.data()['houseNumber'];
            this.kitchenInfo.kitchenArea = doc.data()['kitchenArea'];
            this.kitchenInfo.landMark = doc.data()['landMark'];
            this.kitchenInfo.townCity = doc.data()['townCity'];
            this.kitchenInfo.countryState = doc.data()['countryState'];
            this.kitchenInfo.followers = doc.data()['followers'];
            this.kitchenInfo.following = doc.data()['following'];
            this.kitchenInfo.verified = doc.data()['verified'];
            this.kitchenInfo.kitchenDesc = doc.data()['kitchenDesc'];
          })
        })
        console.log("aaya !")
        this.seller.foodCategory(user.uid).then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log("aaya 2")
            console.log(doc.data())
            console.log(doc)
            console.log(doc.data().length)
            this.photoDisplay.push(doc.data()['photo'])
            this.addFoodPhoto.photo = doc.data()['photo']
            console.log(this.photoDisplay)
          })
        })
      }

    })

  }
  onCoverSelect(e: any) {
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
        localStorage.setItem("profilePic", this.coverImage)
        this.coverImage = reader.result as string;
        console.log(this.coverImage)
        this.uploadCover = true;
      }
    }
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
        console.log(this.image)
        this.uploadButton = true;
      }
    }
  }
  uploadCoverPhoto = async (id: string) => {
    const driverPhotoFilePathUrl = '/files' + Date.now() + this.togetUrl;
    const driver = await this.fireStorage.upload(
      driverPhotoFilePathUrl,
      this.urlImg
    );
    localStorage.removeItem("profilePic");
    this.imgUrl = await driver.ref.getDownloadURL();
    this.coverImage = this.imgUrl;
    console.log('This is imgUrl', this.imgUrl);
    this.uploadCover = false
    // this.seller.addFood(this.addFoodPhoto);
    // this.image = this.imgUrl;
    // this.photos.push(this.imgUrl);

  };
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
    this.uploadButton = false
    // this.seller.addFood(this.addFoodPhoto);
    // this.image = this.imgUrl;
    // this.photos.push(this.imgUrl);

  };
  cancelCoverPhoto() {
    this.coverImage = localStorage.getItem("profilePic")
    console.log(this.coverImage)
    localStorage.removeItem("profilePic");
    this.uploadCover = false;
  }
  cancelPhoto() {
    this.image = localStorage.getItem("profilePic")
    console.log(this.image)
    localStorage.removeItem("profilePic");
    this.uploadButton = false;
  }
  submitUpdate() {
    console.log(this.kitchenInfo)
    console.log(this.updateKitchenUpdate)
    if (this.kitchenInfo.kitchenName != this.updateKitchenUpdate.kitchenName && this.updateKitchenUpdate.kitchenName.length > 3) {
      console.log("aaya kya ?")
      this.kitchenInfo.kitchenName = this.updateKitchenUpdate.kitchenName;
      this.seller.updateKitchenName(this.docId, this.kitchenInfo.kitchenName).then(res => {
        console.log(res)

      }).catch(err => {
        console.log(err);
      });
    }
    if (this.kitchenInfo.countryState != this.updateKitchenUpdate.kitchenState && this.updateKitchenUpdate.kitchenState.length > 3) {
      this.kitchenInfo.countryState = this.updateKitchenUpdate.kitchenState;
      this.seller.updateKitchenState(this.docId, this.kitchenInfo.countryState).then(res => {
        console.log(res)

      }).catch(err => {
        console.log(err);
      });
    }
    if (this.kitchenInfo.kitchenDesc != this.updateKitchenUpdate.kitchenDesc && this.updateKitchenUpdate.kitchenDesc.length > 10) {
      this.kitchenInfo.kitchenDesc = this.updateKitchenUpdate.kitchenDesc;
      this.seller.updateKitchenDesc(this.docId, this.kitchenInfo.kitchenDesc).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err);
      });
    }
    if (this.kitchenInfo.kitchenArea != this.updateKitchenUpdate.kitchenArea && this.updateKitchenUpdate.kitchenArea.length > 3) {
      this.kitchenInfo.kitchenArea = this.updateKitchenUpdate.kitchenArea;
      this.seller.updateKitchenArea(this.docId, this.kitchenInfo.kitchenArea).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err);
      });
    }
    if (this.kitchenInfo.houseNumber != this.updateKitchenUpdate.kitchenNumber && this.updateKitchenUpdate.kitchenNumber.length > 0) {
      this.kitchenInfo.houseNumber = this.updateKitchenUpdate.kitchenNumber;
      this.seller.updateKitchenNumber(this.docId, this.kitchenInfo.houseNumber).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err);
      });
    }
    if (this.kitchenInfo.landMark != this.updateKitchenUpdate.kitchenLandmark && this.updateKitchenUpdate.kitchenLandmark.length > 3) {
      this.kitchenInfo.landMark = this.updateKitchenUpdate.kitchenLandmark;
      this.seller.updateKitchenLandmark(this.docId, this.kitchenInfo.landMark).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err);
      });
    }
    if (this.kitchenInfo.townCity != this.updateKitchenUpdate.kitchenCity && this.updateKitchenUpdate.kitchenCity.length > 3) {
      this.kitchenInfo.townCity = this.updateKitchenUpdate.kitchenCity;
      this.seller.updateKitchenCity(this.docId, this.kitchenInfo.townCity).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err);
      });
    }
  }
}
