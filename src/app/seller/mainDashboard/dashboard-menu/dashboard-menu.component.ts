import { Component, OnInit } from '@angular/core';
import { BuyerUserService } from 'src/app/services/buyer-user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css'],
  providers: [DatePipe],
})
export class DashboardMenuComponent implements OnInit {
  searchTerm: any;
  constructor(
    private seller: BuyerUserService,
    private af: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private user: BuyerUserService,
    public router: Router,
    public datepipe: DatePipe,
    private toastr: ToastrService
  ) {}
  searchfoodValue = '';
  documentID = '';
  photosArr: any = [];
  dataArr: any = [];
  selected: Date | null | undefined;
  startTime = '';
  endTime = '';
  addFoodMsg = 'Item successfully added';
  foodNames = [];
  suggestions = [];
  searchFood(){
    console.log(this.allFoodName);
    this.allFoodName = this.removeEmptyElem(this.allFoodName);
    this.allFoodName = this.remove_duplicates(this.allFoodName);
    // console.log(event.target.value);
    this.suggestions = this.filterItems(this.allFoodName,
      this.searchfoodValue);
      console.log(this.suggestions);
    // this.searchTerm = event.target.value ;
  }
  selectedFood (event: any) {
    console.log(event.target.value);
    this.searchTerm = event.target.value;
    this.suggestions.splice(0, this.suggestions.length);
    this.getSearchResult();
  }
  filterItems(arr: any, query: any) {
    return arr.filter(function (el: any) {
      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }
  removeEmptyElem(ary: any) {
    for (var i = ary.length - 1; i >= 0; i--) {
      if (ary[i] == undefined) {
        ary.splice(i, 1);
      }
    }
    return ary;
  }
  remove_duplicates(arr: string | any[]) {
    var obj: any = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    for (var key in obj) {
      ret_arr.push(key);
    }
    return ret_arr;
  }
  getSearchResult() {
    console.log(this.searchTerm);
    var resultArrrrrr = this.allFood.filter((element: any) => {
      if (element.Name === this.searchTerm) {
        return element;
      }
    });
    console.log('result is ',resultArrrrrr);
    // this.allFood = resultArrrrrr;
    this.searchFoodArr=resultArrrrrr;
  }
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
    console.log('days data', this.dataArr);
  }
  deleteDate(element: any) {
    this.dataArr.splice(element, 1);
  }
  searchFoodArr:any=[];
  allFoodName:any=[];
  allFood:any=[];
  breakfastFood: any = [];
  lunchFood: any = [];
  snacksFood: any = [];
  dinnerFood: any = [];
  otherFood: any = [];
  images: string[] = [];
  addFoodPhoto: any = {
    Name: '',
    activeFood: true,
    RatingNumber: '',
    discription: '',
    foodType: '',
    photo: [],
    price: '',
    shopAddress: '',
    shopName: '',
    foodAllergy: '',
    uid: '',
    sellerName: '',
    daysData: this.dataArr,
  };
  getFiles(event: any) {
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
      }
    }
  }
  itemActivate() {
    this.toastr.info('Itme Activated', '');
  }
  itemDeactivate() {
    this.toastr.info('Itme Deactivated', '');
  }
  showSuccess() {
    this.toastr.success('Item added successfully', '');
  }
  editSuccess() {
    this.toastr.success('Item edit successfully', '');
  }
  deleteSuccess() {
    this.toastr.success('Item deleted successfully', '');
  }
  uploadData = async (id: string) => {
    for (let i = 0; i < this.photosArr.length; i++) {
      const driverPhotoFilePathUrl = 'food photo ' + this.makeid(9);
      const driver = await this.fireStorage.upload(
        driverPhotoFilePathUrl,
        this.photosArr[i]
      );
      var imgUrls: any = await driver.ref.getDownloadURL();
      this.addFoodPhoto.photo.push(imgUrls);
    }
    this.user.addFood(this.addFoodPhoto).then(() => {
      this.showSuccess();
      location.reload();
    });
    console.log('add Food photo', this.addFoodPhoto);
  };
  foodsImages: any = [];
  makeid(length: any) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result, 'random generated string');
    return result;
  }
  foods: any = [];
  foodData: any = {
    Name: '',
    discription: '',
    foodType: '',
    photo: [],
    price: '',
    shopAddress: '',
    shopName: '',
    foodAllergy: '',
    sellerName: '',
    daysData: [],
  };

  editFoodData(docId: any) {
    this.documentID = docId;
    this.seller.getFoodbyId(docId).then((res) => {
      this.foodData.Name = res.data()?.Name;
      this.foodData.price = res.data()?.price;
      this.foodData.discription = res.data()?.discription;
      this.foodsImages.push(res.data()?.photo);
      // this.foodData.photo = res.data()?.photo;
      this.foodData.daysData = res.data()?.daysData;
      this.dataArr = res.data()?.daysData;
      this.foodData.foodAllergy = res.data()?.foodAllergy;
      this.foodData.foodType = res.data()?.foodType;
      console.log('food data', this.foodData);
      console.log('food name ', this.foodData.Name);
    });
  }
  replaceFiles(event: any) {
    if (event.target.files && event.target.files[0]) {
      // this.foodsImages.splice(0, this.images.length);
      this.foodsImages.length = 0;
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
        this.photosArr.push(event.target.files[i]);
      }
    }
  }
  updateFoodData = async () => {
    for (let i = 0; i < this.photosArr.length; i++) {
      const driverPhotoFilePathUrl = 'food photo ' + this.makeid(9);
      const driver = await this.fireStorage.upload(
        driverPhotoFilePathUrl,
        this.photosArr[i]
      );
      var imgUrls: any = await driver.ref.getDownloadURL();
      this.foodData.photo.push(imgUrls);
    }
    this.foodData.daysData = this.dataArr;
    console.log('current doc ID', this.documentID);
    console.log('update food data', this.foodData);
    this.user
      .updateFoodbyId(this.documentID, this.foodData)
      .then(() => {
        this.editSuccess();
        location.reload();
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };
  deleteDocument(docId: any) {
    this.user
      .deleteFoodbyId(docId)
      .then(() => {
        console.log('Document successfully deleted!');
        this.deleteSuccess();
        location.reload();
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }
  foodStatus(id: any, isChecked: boolean) {
    if (isChecked) {
      isChecked = false;
    } else {
      isChecked = true;
    }
    this.seller
      .foodActivation(id, isChecked)
      .then(() => {
        console.log('Document active');
        if (isChecked) {
          this.itemDeactivate();
        } else this.itemDeactivate;
        location.reload();
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }
  currentData() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user !== null) {
        console.log(this.addFoodPhoto.Name);
        this.seller.getSeller(user.uid).then((querySnapshot) => {
          console.log(querySnapshot);
          querySnapshot.forEach((element) => {
            console.log(element.data());
            this.addFoodPhoto.sellerName = element.data()['fullName'];
            this.foodData.sellerName = element.data()['fullName'];
            this.addFoodPhoto.uid = element.data()['uid'];
            console.log('fullname ', element.data()['fullName']);
            console.log('my uid ', element.data()['uid']);
          });
        });
        this.seller.getSellerInfo(user.uid).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.addFoodPhoto.shopAddress = doc.data()['kitchenArea'];
            this.addFoodPhoto.shopName = doc.data()['kitchenName'];
            this.foodData.shopAddress = doc.data()['kitchenArea'];
            this.foodData.shopName = doc.data()['kitchenName'];
          });
        });
        this.seller.foodCategory(user.uid).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.allFoodName.push(
              doc.data().Name
                    )
            this.allFood.push({
              docId: doc.id,
              price: doc.data().price,
              Name: doc.data().Name,
              activeFood: doc.data().activeFood,
            })
         
            if (doc.data().foodType == 'Breakfast') {
              this.breakfastFood.push({
                docId: doc.id,
                price: doc.data().price,
                Name: doc.data().Name,
                activeFood: doc.data().activeFood,
              });
              console.log('breakfast food', this.breakfastFood);
            }
            if (doc.data().foodType == 'Lunch') {
              this.lunchFood.push({
                docId: doc.id,
                price: doc.data().price,
                Name: doc.data().Name,
                activeFood: doc.data().activeFood,
              });
            }
            if (doc.data().foodType == 'Snacks') {
              this.snacksFood.push({
                docId: doc.id,
                price: doc.data().price,
                Name: doc.data().Name,
                activeFood: doc.data().activeFood,
              });
              console.log('snackes data', this.snacksFood);
            }
            if (doc.data().foodType == 'Dinner') {
              this.dinnerFood.push({
                docId: doc.id,
                price: doc.data().price,
                Name: doc.data().Name,
                activeFood: doc.data().activeFood,
              });
            }
            if (doc.data().foodType == 'Other') {
              this.otherFood.push({
                docId: doc.id,
                price: doc.data().price,
                Name: doc.data().Name,
                activeFood: doc.data().activeFood,
              });
            }
          });
          // console.log('docId', this.otherFood[0].docId);
          console.log('breakfast food', this.breakfastFood);
        });
      } else {
        // this.loginUser = false;
        console.log('logout');
      }
    });
      }
  ngOnInit(): void {
    this.currentData();
    console.log(this.allFood,'all food data ')
  }
}
