import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerHomeComponent } from './buyer/buyer-home/buyer-home.component';
import { BuyerLoginComponent } from './buyer/buyer-login/buyer-login.component';
import { BuyerSignupComponent } from './buyer/buyer-signup/buyer-signup.component';
import { CheckoutComponent } from './buyer/checkout/checkout.component';
import { ConfirmationOrderComponent } from './buyer/confirmation-order/confirmation-order.component';
import { FoodDescriptionComponent } from './buyer/food-description/food-description.component';
import { NavbarComponent } from './buyer/navbar/navbar.component';
import { PaymentComponent } from './buyer/payment/payment.component';
import { ProfilePageComponent } from './buyer/profile-page/profile-page.component';
import { SearchComponent } from './buyer/search/search.component';
import { ChatComponent } from './seller/chat/chat.component';
import { DashboardLogininfoComponent } from './seller/mainDashboard/dashboard-logininfo/dashboard-logininfo.component';
import { DashboardMenuComponent } from './seller/mainDashboard/dashboard-menu/dashboard-menu.component';
import { DashboardOrderComponent } from './seller/mainDashboard/dashboard-order/dashboard-order.component';
import { DashboardpaymentsComponent } from './seller/mainDashboard/dashboardpayments/dashboardpayments.component';
import { DashboardpayoutComponent } from './seller/mainDashboard/dashboardpayout/dashboardpayout.component';
import { NavbarDashbordComponent } from './seller/navbar-dashbord/navbar-dashbord.component';
import { Navbar2Component } from './seller/navbar2/navbar2.component';
import { RegistrationComponent } from './seller/registration/registration.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
import { SellerLoginComponent } from './seller/seller-login/seller-login.component';
import { SellerProfileComponent } from './seller/seller-profile/seller-profile.component';
import { SellerSignupComponent } from './seller/seller-signup/seller-signup.component';
import { OrderComponent } from './buyer/order/order.component';
import { CartComponent } from './buyer/cart/cart.component';
const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [

      {
        path: '',
        component: BuyerHomeComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'search/:id',
        component: SearchComponent
      },
      {
        path: 'foodDescription/:id',
        component: FoodDescriptionComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },

      {
        path: 'profilePage/:id',
        component: ProfilePageComponent
      },
      {
        path: 'Order',
        component: DashboardOrderComponent,
      },


    ]
  },
  {
    path: 'buyer/login',
    component: BuyerLoginComponent
  },
  {
    path: 'buyer/signup',
    component: BuyerSignupComponent
  },

  {
    path: 'seller',
    component: SellerHomeComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'profile',
    component: SellerProfileComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'confirmationOrder',
    component: ConfirmationOrderComponent
  },
  {
    path: 'seller/login',
    component: SellerLoginComponent
  },
  {
    path: 'seller/signup',
    component: SellerSignupComponent
  },

  {
    path: 'navbar2',
    component: Navbar2Component
  },
  {
    path: 'dashboard',
    component: NavbarDashbordComponent,
    children: [
      {
        path: '',
        component: DashboardLogininfoComponent,
      },
      {
        path: 'Menu',
        component: DashboardMenuComponent,
      },

      {
        path: 'Payments',
        component: DashboardpaymentsComponent,
      },
      {
        path: 'payout',
        component: DashboardpayoutComponent,
      },
      {
        path: 'Order',
        component: DashboardOrderComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
