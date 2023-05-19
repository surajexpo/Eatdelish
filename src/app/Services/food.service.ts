import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
// import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  db = firebase.firestore();
  typeOfFood = '';
  foodsWithIdInItArr: any = [];
  foodsWithIdInItArrByPinCode: any = [];
  result = '';

  constructor(private fire: AngularFirestore,) {
    this.getAllFoodsDatasssWithIdInIt();
    this.result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = 7;
    for (var i = 0; i < length; i++) {
      this.result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
  }
  // header = {
  //   headers: new HttpHeaders({

  //     'Content-Type': 'application/json',
  //   }),
  // };
  // foodCategory() {
  //   return this.fire.collection('categoryListing').snapshotChanges();
  // }
  getbyId(id: any) {
    return this.db.collection('categoryListing').doc(id).get();
  }
  foodCategory(typrOfFood: any, lastFood: any) {
    // return this.fire.firestore.collection('categoryListing').orderBy('foodType').startAt(typrOfFood).endAt(typrOfFood + "\uf8ff").get();
    // console.log('ma',lastFood)
    return this.fire.firestore.collection('categoryListing').orderBy('Name', 'desc').where('foodType', '==', typrOfFood).startAfter(lastFood).limit(2).get();
  }
  foodCategoryFirst(typrOfFood: any) {
    // return this.fire.firestore.collection('categoryListing').orderBy('foodType').startAt(typrOfFood).endAt(typrOfFood + "\uf8ff").get();
    return this.fire.firestore.collection('categoryListing').where('foodType', '==', typrOfFood).limit(2).get();
  }
  searchFood(foodType: any, lastFood: any) {
    // return this.fire.firestore.collection('categoryListing').orderBy('Name').startAfter(lastFood).limit(2).startAt(foodType).endAt(foodType + "\uf8ff").get();
    return this.fire.firestore.collection('categoryListing').orderBy('Name').limit(100).startAt(foodType).endAt(foodType + "\uf8ff").get();

  }
  searchFoodByPinCode(pincode: any) {
    // return this.fire.firestore.collection('categoryListing').orderBy('Name').startAfter(lastFood).limit(2).startAt(foodType).endAt(foodType + "\uf8ff").get();
    // return this.fire.firestore.collection('categoryListing').where('pinCode', "==", pincode).get();
    return firebase.firestore().collection('categoryListing').where('pinCode', "==", pincode).get().then((res) => {
      res.docs.forEach((data) => {
        const food = {
          id: data.id,
          RatingNumber: data.data().RatingNumber,
          alldays: true,
          alldaysFrom: data.data().alldaysFrom,
          alldaysTo: data.data().alldaysTo,
          discription: data.data().discription,
          foodAllergy: data.data().foodAllergy,
          foodType: data.data().foodType,
          Name: data.data().Name,
          friday: data.data().friday,
          fridayFrom: data.data().fridayFrom,
          fridayTo: data.data().fridayTo,
          monday: data.data().monday,
          mondayFrom: data.data().mondayFrom,
          mondayTo: data.data().mondayTo,
          photo: data.data().photo,
          price: data.data().price,
          saturday: data.data().saturday,
          saturdayFrom: data.data().saturdayFrom,
          saturdayTo: data.data().saturdayTo,
          shopAddress: data.data().shopAddress,
          shopName: data.data().shopName,
          sunday: data.data().sunday,
          sundayFrom: data.data().sundayFrom,
          sundayTo: data.data().sundayTo,
          thursday: data.data().thursday,
          thursdayFrom: data.data().thursdayFrom,
          thursdayTo: data.data().thursdayTo,
          tuesday: data.data().tuesday,
          tuesdayFrom: data.data().tuesdayFrom,
          tuesdayTo: data.data().tuesdayTo,
          uid: data.data().uid,
          wednesday: data.data().wednesday,
          wednesdayFrom: data.data().wednesdayFrom,
          wednesdayTo: data.data().wednesdayTo,
        };
        this.foodsWithIdInItArrByPinCode.push(food);
      });
    });
  }
  // searchFoodNext(foodType:any,lastFood:any){
  //   return this.fire.firestore.collection('categoryListing').orderBy('Name').startAfter(lastFood).limit(2).startAt(foodType).endAt(foodType + "\uf8ff").get();

  // }
  ///////////////////////////add to card /////////

  addReview(rating: number, review: string, id: string, docId: string, name: string) {
    const documentId = docId

    var today = new Date();

    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const reviewss = {
      uid: id,
      comment: review,
      rating: rating,
      foodId: docId,
      date: date,
      name: name,
    }
    console.log('document Id ==>', documentId);
    console.log('reviessss ==>', reviewss);
    return this.fire.collection('reviews').add(reviewss);
  }
  getReviewsByFoodId(foodId: any) {
    return firebase.firestore().collection('reviews').where("foodId", "==", foodId).get();
  }
  addToCart(record: any) {
    return this.fire.collection('Buyer').add(record).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
  updateAddToCart(id: any, data: any) {
    return this.fire.collection('Buyer').doc(id).update({ cart: data });
  }
  getUserByID() {
    return this.db.collection('Buyer').doc('DCxAx6h48DE9J0fLD8Hb').get();
  }
  getUserByIDD(id: any) {
    return this.db.collection('Buyer').where("uid", "==", id).get();
  }
  async getAllFoodsName() {
    const snapshot = await firebase.firestore().collection('categoryListing').get()
    return snapshot.docs.map(doc => doc.data()['Name']);
  }
  async getAllFoodsData() {
    const snapshot = await firebase.firestore().collection('categoryListing').get()
    return snapshot.docs.map(doc => doc.data());
  }
  async getAllFoodsDatasss() {
    return firebase.firestore().collection('categoryListing').get();

  }
  async getAllFoodsDatasssWithIdInIt() {
    return firebase.firestore().collection('categoryListing').get().then((res) => {
      res.docs.forEach((data) => {
        const food = {
          id: data.id,
          RatingNumber: data.data().RatingNumber,
          alldays: true,
          alldaysFrom: data.data().alldaysFrom,
          alldaysTo: data.data().alldaysTo,
          discription: data.data().discription,
          foodAllergy: data.data().foodAllergy,
          foodType: data.data().foodType,
          Name: data.data().Name,
          friday: data.data().friday,
          fridayFrom: data.data().fridayFrom,
          fridayTo: data.data().fridayTo,
          monday: data.data().monday,
          mondayFrom: data.data().mondayFrom,
          mondayTo: data.data().mondayTo,
          photo: data.data().photo,
          price: data.data().price,
          saturday: data.data().saturday,
          saturdayFrom: data.data().saturdayFrom,
          saturdayTo: data.data().saturdayTo,
          shopAddress: data.data().shopAddress,
          shopName: data.data().shopName,
          sunday: data.data().sunday,
          sundayFrom: data.data().sundayFrom,
          sundayTo: data.data().sundayTo,
          thursday: data.data().thursday,
          thursdayFrom: data.data().thursdayFrom,
          thursdayTo: data.data().thursdayTo,
          tuesday: data.data().tuesday,
          tuesdayFrom: data.data().tuesdayFrom,
          tuesdayTo: data.data().tuesdayTo,
          uid: data.data().uid,
          wednesday: data.data().wednesday,
          wednesdayFrom: data.data().wednesdayFrom,
          wednesdayTo: data.data().wednesdayTo,
        };
        this.foodsWithIdInItArr.push(food);
      });
      // console.log('wednesdayTo', this.foods)
    });

  }
}

