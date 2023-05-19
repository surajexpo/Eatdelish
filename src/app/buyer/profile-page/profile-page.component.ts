import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuyerUserService } from 'src/app/services/buyer-user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  coverImage: any = '../../../assets/images/Rectangle 218.png';
  image: any = '../../../assets/images/111.png';
  imgUrl = '';
  urlImg = '';
  togetUrl = '';
  about: any = '';
  aboutTrue = false;
  uid: string | null | undefined;
  constructor(private buyer: BuyerUserService, private activatedRoute: ActivatedRoute) { }
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
    verified: false,
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
    uid: '',
  };
  photoDisplay: any = [];
  ngOnInit(): void {
    this.uid = this.activatedRoute.snapshot.paramMap.get('id');
    this.buyer.getSellerInfo(this.uid).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // this.addFoodPhoto.uid = doc.data()['uid'];
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
      });
    });
    this.buyer.foodCategory(this.uid).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('aaya 2');
        console.log(doc.data());
        console.log(doc);
        console.log(doc.data().length);
        this.photoDisplay.push(doc.data()['photo']);
        this.addFoodPhoto.photo = doc.data()['photo'];
        console.log(this.photoDisplay);
      });
    });
    this.coverImage = this.addFoodPhoto.photo;
    this.foodShow();
  }
  viewMore() {
    // let gel = document.querySelector<HTMLElement>("gallery");
    let gel = document.querySelector<HTMLElement>('.gallery')!;
    gel.style.display = 'none';
    let gel12 = document.querySelector<HTMLElement>('.gallery112')!;
    gel12.style.display = 'flex';
    let gel123 = document.querySelector<HTMLElement>('.RatingReview')!;
    gel123.style.display = 'none';
    let gel1234 = document.querySelector<HTMLElement>('.veiw-more')!;
    gel1234.style.display = 'none';
  }
  foodShow() {
    let gel = document.querySelector<HTMLElement>('.gallery')!;
    gel.style.display = 'flex';
    let gel12 = document.querySelector<HTMLElement>('.gallery112')!;
    gel12.style.display = 'none';
    let gel123 = document.querySelector<HTMLElement>('.RatingReview')!;
    gel123.style.display = 'none';
    let gel1234 = document.querySelector<HTMLElement>('.veiw-more')!;
    gel1234.style.display = 'flex';
    let food = document.querySelector<HTMLElement>('.food')!;
    food.style.color = '#000000';
    let food12 = document.querySelector<HTMLElement>('.food12')!;
    food12.style.color = '#595959';
  }
  ratingReview() {
    let gel = document.querySelector<HTMLElement>('.gallery')!;
    gel.style.display = 'none';
    let gel12 = document.querySelector<HTMLElement>('.gallery112')!;
    gel12.style.display = 'none';
    let gel123 = document.querySelector<HTMLElement>('.RatingReview')!;
    gel123.style.display = 'flex';
    let gel1234 = document.querySelector<HTMLElement>('.veiw-more')!;
    gel1234.style.display = 'none';
    let food = document.querySelector<HTMLElement>('.food')!;
    food.style.color = '#595959';
    let food12 = document.querySelector<HTMLElement>('.food12')!;
    food12.style.color = '#000000';
  }
}
