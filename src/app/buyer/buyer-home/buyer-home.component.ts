import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/Services/food.service';

@Component({
  selector: 'app-buyer-home',
  templateUrl: './buyer-home.component.html',
  styleUrls: ['./buyer-home.component.css']
})
export class BuyerHomeComponent implements OnInit {
  searchfoodValue = '';
  foodsNameArr: any = [];
  suggestions: any = [];
  disableSearchButton: boolean = true;

  constructor(private food: FoodService, private router: Router) { }

  ngOnInit(): void {
    this.getAllFoods();
  }
  foodtype(typrFood: any) {
    sessionStorage['typeOfFood'] = typrFood;
    console.log(typrFood);

  }
  getAllFoods() {
    this.food.getAllFoodsName().then((res) => {
      res.forEach((data: any) => {
        this.foodsNameArr.push(data);
      })
      console.log('foodName ====>', this.foodsNameArr);
    })
  }
  validateField(event: any) {
    if (event.target.value === '') {
      this.disableSearchButton = true;
    }
    else
      this.disableSearchButton = false;
  }
  suggest() {
    this.foodsNameArr = this.removeEmptyElem(this.foodsNameArr);
    this.foodsNameArr = this.remove_duplicates(this.foodsNameArr);
    console.log(this.filterItems(this.foodsNameArr, this.searchfoodValue));
    this.suggestions = this.filterItems(this.foodsNameArr, this.searchfoodValue);
  }
  closeBox(event: any) {
    console.log(event.target.value);
    this.searchfoodValue = event.target.value;
    this.suggestions.splice(0, this.suggestions.length);
    this.router.navigate(
      ['/search'],
      { queryParams: { searchBy: this.searchfoodValue } }
    );
  }
  closeBoxx(event: any) {
    this.searchfoodValue = event;
    this.suggestions.splice(0, this.suggestions.length);
    this.router.navigate(
      ['/search'],
      { queryParams: { searchBy: this.searchfoodValue } }
    );
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

  filterItems(arr: any, query: any) {
    return arr.filter(function (el: any) {
      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }
}
