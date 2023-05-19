import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FoodService } from '../../Services/food.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  foods: any = [];
  foodindex: any = [];
  searchfood: any = [];
  foodName: any;
  lastitem = '';
  foodType = '';
  searchTrue: boolean = true;
  searchfoodValue = '';
  foodsNameArr: any = [];
  suggestions: any = [];
  showSpinner: boolean = false;
  allFoodsData: any = [];
  filteredFoodData: any;
  searchFromHome: string | null | undefined;

  constructor(
    private food: FoodService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    // this.foods = this.food.foodsWithIdInItArr;
    // this.category();
    this.activatedRoute.queryParamMap.subscribe((params) => {
      console.log('params from home page', params.get('searchBy'));
      this.searchFromHome = params.get('searchBy');
    });
    // if (this.searchFromHome === '') {
    // this.foodName = sessionStorage['typeOfFood'];
    this.foods = this.food.foodsWithIdInItArr;
    // }
    if (this.searchFromHome !== null) {
      // this.foodName = sessionStorage['typeOfFood'];
      console.log(this.searchFromHome)
      this.searchfoodValue = JSON.stringify(this.searchFromHome).replace(/^"(.*)"$/, '$1');
      this.searchfoodValue.slice(1, -1);
      this.foods = this.food.foodsWithIdInItArr.filter((element: any) => {
        if (element.Name === this.searchFromHome) {
          return element;
        }
      });
    }
    this.getAllFoods();

  }
  async pagination() {
    // console.log("las

    if (this.searchTrue) {
      this.lastitem = this.foods[this.foods.length - 1].Name;
      // console.log(this.foods[this.foods.length - 1].Name);

      await this.food.foodCategory(this.foodName, this.lastitem).then((doc) => {
        doc.forEach((data: any) => {
          this.foods.push(data.data());
        });
      });
    }
  }
  // defaultFoodData() {
  // this.food.getAllFoodsDatasss().then((res) => {
  //   res.docs.forEach((data) => {
  //     const food = {
  //       id: data.id,
  //       RatingNumber: data.data().RatingNumber,
  //       alldays: true,
  //       alldaysFrom: data.data().alldaysFrom,
  //       alldaysTo: data.data().alldaysTo,
  //       discription: data.data().discription,
  //       foodAllergy: data.data().foodAllergy,
  //       foodType: data.data().foodType,
  //       Name: data.data().Name,
  //       friday: data.data().friday,
  //       fridayFrom: data.data().fridayFrom,
  //       fridayTo: data.data().fridayTo,
  //       monday: data.data().monday,
  //       mondayFrom: data.data().mondayFrom,
  //       mondayTo: data.data().mondayTo,
  //       photo: data.data().photo,
  //       price: data.data().price,
  //       saturday: data.data().saturday,
  //       saturdayFrom: data.data().saturdayFrom,
  //       saturdayTo: data.data().saturdayTo,
  //       shopAddress: data.data().shopAddress,
  //       shopName: data.data().shopName,
  //       sunday: data.data().sunday,
  //       sundayFrom: data.data().sundayFrom,
  //       sundayTo: data.data().sundayTo,
  //       thursday: data.data().thursday,
  //       thursdayFrom: data.data().thursdayFrom,
  //       thursdayTo: data.data().thursdayTo,
  //       tuesday: data.data().tuesday,
  //       tuesdayFrom: data.data().tuesdayFrom,
  //       tuesdayTo: data.data().tuesdayTo,
  //       uid: data.data().uid,
  //       wednesday: data.data().wednesday,
  //       wednesdayFrom: data.data().wednesdayFrom,
  //       wednesdayTo: data.data().wednesdayTo,
  //     };
  //     this.foods.push(food);
  //   });
  //   // console.log('wednesdayTo', this.foods)
  // });
  // }
  async category() {
    await this.food.foodCategoryFirst(this.foodName).then((doc) => {
      doc.forEach((data: any) => {
        this.foods.push(data.data());
        this.foodindex.push(data.id);
        // console.log(this.foodindex);
      });
    });
  }
  async searchTypeOfFood() {
    let isnum = /^\d+$/.test(this.searchfoodValue);
    if (isnum === true) {
      if (this.searchfoodValue.length > 8 || this.searchfoodValue.length < 4) {
        alert('invalid pincode !');
      }
      else {
        this.foods.length = 0;
        this.food.searchFoodByPinCode(parseInt(this.searchfoodValue)).then((res) => {
          console.log('now check data ++', res);
        }).then(() => {
          console.log('data ====> ', this.food.foodsWithIdInItArrByPinCode);
          this.foods = this.food.foodsWithIdInItArrByPinCode;
        })
      }
    }
    if (isnum === false) {
      this.suggestions.splice(0, this.suggestions.length);
      this.showSpinner = true;
      this.searchTrue = false;
      this.foodindex = [];
      this.foods = [];
      this.foodType = this.searchfoodValue;
      await this.food.searchFood(this.foodType, this.lastitem).then((doc) => {
        doc.forEach((data: any) => {
          // this.foods.push(data.data());
          // this.foodindex.push(data.id);
          // console.log(this.foodindex);
          // console.log(this.foods);
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
          this.foods.push(food);
        });
      });
    }
    this.showSpinner = false;
  }
  foodIndex(i: any) {
    // console.log('me chal ra hu', i);
    // console.log(this.foodindex[i]);
    sessionStorage['foodid'] = this.foodindex[i];
  }
  async addTocart(foodId: any) {
    let data: any = await (await this.food.getUserByID()).data();
    // console.log(typeof data.cart,"me bhi chal gya");
    let ID = this.foodindex[foodId];
    let maindata = Array.from(data.cart);
    maindata.push(ID);
    let id = 'hCTp22vCX41EYlDn2XG0';
    this.food.updateAddToCart(id, maindata);
  }

  getAllFoods() {
    this.food.getAllFoodsName().then((res) => {
      res.forEach((data: any) => {
        this.foodsNameArr.push(data);
      });
      // console.log('foodName ====>', this.foodsNameArr);
    });
  }
  suggest(){
    this.foodsNameArr = this.removeEmptyElem(this.foodsNameArr);
    this.foodsNameArr = this.remove_duplicates(this.foodsNameArr);
    // console.log(this.filterItems(this.foodsNameArr, this.searchfoodValue));
    this.suggestions = this.filterItems(this.foodsNameArr,
    this.searchfoodValue);
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
      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }
  selectCountry(event: any) {
    this.searchfoodValue = event.target.value;
    this.suggestions.splice(0, this.suggestions.length);
    this.searchTypeOfFood();
    // this.userData.state = '';
  }
  sortDataByHighToLowPrice() {
    // this.food.getAllFoodsData().then((res) => {
    //   console.log('==>', res);
    // })
    this.allFoodsData = this.foods;
    // console.log('allFoodsData==>', this.allFoodsData);
    this.foods = this.allFoodsData.sort((a: any, b: any) => {
      return b.price - a.price;
    });
  }
  sortDataByLowToHighPrice() {
    // this.food.getAllFoodsData().then((res) => {
    //   console.log('==>', res);
    // })
    this.allFoodsData = this.foods;
    // console.log('allFoodsData==>', this.allFoodsData);
    this.foods = this.allFoodsData.sort((a: any, b: any) => {
      return a.price - b.price;
    });
  }
  sortDataByCategory(event: any) {
    // this.food.getAllFoodsData().then((res) => {
    //   this.foods = res;
    // })
    this.foods = this.food.foodsWithIdInItArr.filter((element: any) => {
      if (element.foodType === event) {
        return element;
      }
    });
  }
  sortDataByCategoryHomePage() {
    console.log(this.searchFromHome)
    this.foods = this.food.foodsWithIdInItArr.filter((element: any) => {
      if (element.foodType === this.searchFromHome) {
        return element;
      }
    });
    // this.food.getAllFoodsData().then((res) => {
    //   this.foods = res;
    // })
  }
  resetFilter() {
    console.log('reset foods works');
    // this.foods.splice(0, this.foods.length);
    this.foods = this.food.foodsWithIdInItArr;
  }
}
