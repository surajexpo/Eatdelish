import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { BuyerUserService } from 'src/app/services/buyer-user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard-logininfo',
  templateUrl: './dashboard-logininfo.component.html',
  styleUrls: ['./dashboard-logininfo.component.css']
})
export class DashboardLogininfoComponent implements OnInit {
docId='';
  sellerInfo = {
    firstName: '',
    lastName: '',
    country: 'United States',
    zipcode: '',
    location: '',
    state: ''

  }
  constructor(private seller: BuyerUserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSellerData();
  }
  editSuccess() {
    this.toastr.success('Information edit successfully', '');
  }
  updateInfo(){
    console.log('seller Info',this.sellerInfo)
    console.log('doc ID',this.docId)
    this.seller.updateSellerInfo(this.docId,this.sellerInfo).then(() => {
      console.log('Document successfully updated!');
      this.editSuccess();
      location.reload();
    });
  }
   getSellerData() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.seller.getSellerInfo(user.uid).then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.sellerInfo.firstName = doc.data()['firstName'];
            this.sellerInfo.lastName = doc.data()['lastName'];
            this.sellerInfo.zipcode = doc.data()['zipcode'];
            this.sellerInfo.location = doc.data()['townCity'];
            this.sellerInfo.state = doc.data()['countryState'];
            this.docId= doc.id;
          })
        })
      }
    })
  }
}
