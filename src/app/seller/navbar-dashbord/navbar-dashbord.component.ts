import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-dashbord',
  templateUrl: './navbar-dashbord.component.html',
  styleUrls: ['./navbar-dashbord.component.css']
})
export class NavbarDashbordComponent implements OnInit {

  constructor() { }

  showSideBar:Boolean=true
  ngOnInit(): void {
  }
  sidebar(){
    this.showSideBar=!this.showSideBar;
  }
}
