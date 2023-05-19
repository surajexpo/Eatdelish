import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SearchUserService {

  constructor() { }

  lookForUserInBuyerCollection(uid: any) {
    // this.af.collection('Buyer').where('uid','==',uid)
    return firebase.firestore().collection('Buyer').where('uid', '==', uid).get();
  }
  lookForUserInSellerCollection(uid: any) {
    // this.af.collection('Buyer').where('uid','==',uid)
    return firebase.firestore().collection('Seller').where('uid', '==', uid).get();
  }
}
