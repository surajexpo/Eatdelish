import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { MatStepperModule } from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './buyer/navbar/navbar.component';
import { BuyerHomeComponent } from './buyer/buyer-home/buyer-home.component';
import { SearchComponent } from './buyer/search/search.component';
import { FooterComponent } from './footer/footer.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
import { RegistrationComponent } from './seller/registration/registration.component';
import { SellerProfileComponent } from './seller/seller-profile/seller-profile.component';
import { ChatComponent } from './seller/chat/chat.component';
import { FoodDescriptionComponent } from './buyer/food-description/food-description.component';
import { CheckoutComponent } from './buyer/checkout/checkout.component';
import { PaymentComponent } from './buyer/payment/payment.component';
import { ConfirmationOrderComponent } from './buyer/confirmation-order/confirmation-order.component';
import { BuyerLoginComponent } from './buyer/buyer-login/buyer-login.component';
import { BuyerSignupComponent } from './buyer/buyer-signup/buyer-signup.component';
import { SellerLoginComponent } from './seller/seller-login/seller-login.component';
import { SellerSignupComponent } from './seller/seller-signup/seller-signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProfilePageComponent } from './buyer/profile-page/profile-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Navbar2Component } from './seller/navbar2/navbar2.component';
import { NavbarDashbordComponent } from './seller/navbar-dashbord/navbar-dashbord.component';
import { DashboardLogininfoComponent } from './seller/mainDashboard/dashboard-logininfo/dashboard-logininfo.component';
import { DashboardMenuComponent } from './seller/mainDashboard/dashboard-menu/dashboard-menu.component';
import { DashboardOrderComponent } from './seller/mainDashboard/dashboard-order/dashboard-order.component';
import { DashboardpaymentsComponent } from './seller/mainDashboard/dashboardpayments/dashboardpayments.component';
import { DashboardpayoutComponent } from './seller/mainDashboard/dashboardpayout/dashboardpayout.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { OrderComponent } from './buyer/order/order.component';
import { CartComponent } from './buyer/cart/cart.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { CalenderBuyerComponent } from './buyer/calender-buyer/calender-buyer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    BuyerSignupComponent,
    AppComponent,
    AppComponent,
    NavbarComponent,
    BuyerHomeComponent,
    SearchComponent,
    FooterComponent,
    SellerHomeComponent,
    RegistrationComponent,
    SellerProfileComponent,
    ChatComponent,
    FoodDescriptionComponent,
    CheckoutComponent,
    PaymentComponent,
    ConfirmationOrderComponent,
    BuyerLoginComponent,
    BuyerSignupComponent,
    SellerLoginComponent,
    SellerSignupComponent,
    ProfilePageComponent,
    Navbar2Component,
    NavbarDashbordComponent,
    DashboardLogininfoComponent,
    DashboardMenuComponent,
    DashboardOrderComponent,
    DashboardpaymentsComponent,
    DashboardpayoutComponent,
    OrderComponent,
    CartComponent,
    CalenderBuyerComponent,
  ],
  imports: [
    AngularFireStorageModule,
    CarouselModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatNativeDateModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
