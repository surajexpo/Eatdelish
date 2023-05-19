import { Injectable } from '@angular/core';
import firebase from 'firebase';
@Injectable({
  providedIn: 'root',
})
export class BuyerUserService {
  db = firebase.firestore();
  constructor() {}
  signup(user: any) {
    this.db.collection('Buyer').add(user);
  }
  checkForExistingUser(userPhone: any) {
    console.log('aa gya');
    return this.db
      .collection('Buyer')
      .where('phoneNumber', '==', userPhone)
      .get();
  }
  getData(userUid: any) {
    return this.db.collection('Buyer').where('uid', '==', userUid).get();
  }
  sellerSignup(user: any) {
    this.db.collection('Seller').add(user);
  }
  checkForExistingSeller(userPhone: any) {
    return this.db
      .collection('Seller')
      .where('phoneNumber', '==', userPhone)
      .get();
  }
  checkKitchenName(name: string) {
    return this.db
      .collection('KitchenInfo')
      .where('kitchenName', '==', name)
      .get();
  }
  addFood(user: any){
   return this.db.collection('categoryListing').add(user);
  }
  
  foodActivation(ID:any,data:any){
     return this.db.collection('categoryListing').doc(ID).set({
      activeFood : data
    },{merge: true});
  }
  getFoodbyId(ID: any) {
    return this.db.collection('categoryListing').doc(ID).get();
  }

  updateFoodbyId(ID: any, data:any) {
    return this.db.collection('categoryListing').doc(ID).update(data);
  }
  updateSellerInfo(ID: any, data:any) {
    return this.db.collection('KitchenInfo').doc(ID).update(data);
  }
  deleteFoodbyId(ID:any){
    return this.db.collection("categoryListing").doc(ID).delete();
  }

  setRegistration(user: any) {
    this.db.collection('KitchenInfo').add(user);
  }
  getSellerInfo(userUid: any) {
    return this.db.collection('KitchenInfo').where('uid', '==', userUid).get();
  }
  getSeller(userUid: any) {
    return this.db.collection('Seller').where('uid', '==', userUid).get();
  }
  foodCategory(userUid: any) {
    return this.db
      .collection('categoryListing')
      .where('uid', '==', userUid)
      .get();
  }
  getVerification(id: any, data: any) {
    return this.db.collection('KitchenInfo').doc(id).update('verified', data);
  }
  toreachKitchenInfo(name: any) {
    console.log('chala kya');
    return this.db
      .collection('KitchenInfo')
      .where('kitchenName', '==', name)
      .get();
  }
  updateKitchenName(id: any, data: any) {
    return this.db
      .collection('KitchenInfo')
      .doc(id)
      .update('kitchenName', data);
  }
  updateKitchenState(id: any, data: any) {
    return this.db
      .collection('KitchenInfo')
      .doc(id)
      .update('countryState', data);
  }
  updateKitchenDesc(id: any, data: any) {
    return this.db
      .collection('KitchenInfo')
      .doc(id)
      .update('kitchenDesc', data);
  }
  updateKitchenArea(id: any, data: any) {
    return this.db
      .collection('KitchenInfo')
      .doc(id)
      .update('kitchenArea', data);
  }
  updateKitchenNumber(id: any, data: any) {
    return this.db
      .collection('KitchenInfo')
      .doc(id)
      .update('houseNumber', data);
  }
  updateKitchenLandmark(id: any, data: any) {
    return this.db.collection('KitchenInfo').doc(id).update('landMark', data);
  }
  updateKitchenCity(id: any, data: any) {
    return this.db.collection('KitchenInfo').doc(id).update('townCity', data);
  }
  updateBuyerName(id: any, data: any) {
       return this.db.collection('Buyer').doc(id).update('fullName', data);
  }
  updateBuyerNumber(id: any, data: any) {
    return this.db.collection('Buyer').doc(id).update('phoneNumber', data);
  }
}
