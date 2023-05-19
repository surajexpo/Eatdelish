import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FoodService } from '../../Services/food.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  foodID: any = []
  cartFoods: any = []
  foodPrice: number=0
  constructor(private food: FoodService) { }

  ngOnInit(): void {
    this.addTocart();

  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  async addTocart() {
    this.foodID = await (await this.food.getUserByID()).data();
    console.log(this.foodID.cart, "in cart");
    this.foodById()
  }
  async foodById() {

    await this.foodID.cart.forEach(async (i: any) => {

      await this.food.getbyId(i).then(async(doc) => {
        // console.log(doc.data());
        await this.cartFoods.push(doc.data())
        // console.log(this.cartFoods); 
      })
    await this.price();
    })
  }
  price() {
    // console.log("me cha gya");
    // console.log(this.cartFoods[0].price, "lhj");
    this.foodPrice=0
    for (let i = 0; i < this.cartFoods.length; i++) {
      this.foodPrice += this.cartFoods[i].price
      // console.log(this.foodPrice, "bhai me arroy function");

    }
  }
  deletecart(index:any){
    
  }
}

