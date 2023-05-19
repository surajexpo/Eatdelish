import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalDateService } from 'src/app/Services/cal-date.service';
import { SearchUserService } from 'src/app/Services/search-user.service';
import { FoodService } from '../../Services/food.service';
import firebase from 'firebase';


@Component({
  selector: 'app-food-description',
  templateUrl: './food-description.component.html',
  styleUrls: ['./food-description.component.css']
})
export class FoodDescriptionComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 1;
  userId: any;
  review = '';
  showSpinner: boolean = false;
  allReviews: any = [];
  userReview = {
    username: '',
    rating: 0,
    email: '',
    userType: '',
    date: '',
  }
  userrId: string = '';
  name: any;

  counter(i: number) {
    return new Array(i);
  }

  constructor(private route: Router, private food: FoodService, private activatedRoute: ActivatedRoute, private calDate: CalDateService,
    private searchUser: SearchUserService) { }
  foodID: any;
  foodDec12: any = [];

  ngOnInit(): void {
    // this.foodID = sessionStorage['foodid'];
    this.foodID = this.activatedRoute.snapshot.paramMap.get('id')
    this.foodDec();
    this.getAllReviews();
  }

  addReview() {
    this.showSpinner = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // console.log(user);
        this.userrId = user.uid;
        // alert('user is logged In!' + this.userrId);
        if (this.userrId !== '') {
          this.lookForUser(this.userrId);
          console.log('if user id ' + this.userrId + 'exist !,' + ' username must be printed', this.name);
          if (this.userrId !== '') {
            this.food.addReview(this.selectedValue, this.review, this.userrId, this.foodID, this.name).then((res) => {
              console.log('reviews added', res);
            }).then(() => {
              this.getAllReviews();
            });
          }
          else if (this.userrId === '') {
            alert('user must be login to give review!');
          }
        }
        // ...
      } else {
        // User is signed out
        // ...
        alert('user is not logged in !');
      }
    });
    this.showSpinner = false;
  }
  getAllReviews() {
    this.allReviews.length = 0;
    this.showSpinner = true;
    this.food.getReviewsByFoodId(this.foodID).then((res) => {
      res.forEach((doc) => {
        console.log('reviews data ', doc.data());
        this.allReviews.push(doc.data());
        this.lookForUser(doc.data().uid);
        this.userReview.rating = doc.data().rating;
        this.userReview.date = JSON.stringify(new Date(doc.data().date).getTime());
      })
      console.log('reviews data ', this.allReviews);
    });
    this.showSpinner = false;
  }

  lookForUser(uid: any) {
    console.log('looking for userID')
    this.searchUser.lookForUserInSellerCollection(uid)
      .then((querySnapshot) => {
        console.log(querySnapshot.empty)
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //agar querysnapshot hoga empty, to we will search in BuyerCollection..
            console.log(doc.id, " => ", doc.data(), 'look for username');
            this.name = doc.data().fullName;
          });
        }
        else {
          this.searchUser.lookForUserInBuyerCollection(uid).then((querySnapshot) => {
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                this.name = doc.data().fullName;
                // this.allReviews.push(doc.data().fullName);
                console.log(this.allReviews);
              })
            }
          })
        }
      })
      .catch(function (error) {
        console.log("couldnot find the user id!: ", error);
      });
  }
  public link12() {

    let class12 = document.getElementsByClassName("modal fade show");
    class12[0].className = "modal fade";

    console.log("hello");
    console.log(class12[0].className);


  }
  foodDec() {
    // console.log(this.foodID);
    this.food.getbyId(this.foodID).then(doc => {
      // console.log(doc.data());
      this.foodDec12 = doc.data()
      // console.log(this.foodDec12.uid);
      // console.log(this.foodDec12.daysData)
      for (var i = 0; i < this.foodDec12.daysData.length; i++) {
        // console.log(this.foodDec12.daysData[i].date);
        this.calDate.datesOfAvialableDays.push(this.foodDec12.daysData[i].date);
      }
      this.userId = this.foodDec12.uid;
      console.log('sfdgdfgdfsgdfsgdfsg', this.userId)
      this.food.getUserByIDD(this.userId).then((res) => {
        res.forEach((res) => {
          console.log(res.data());
        })
      })
    })
  }

  countStar(star: any) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }

}
