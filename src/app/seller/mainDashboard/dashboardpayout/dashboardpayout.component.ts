import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardpayout',
  templateUrl: './dashboardpayout.component.html',
  styleUrls: ['./dashboardpayout.component.css']
})
export class DashboardpayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  paymentout12() {
    let dec = document.querySelector<HTMLElement>(".paymentout")!;
    dec.style.display = "block";
    let dec1 = document.querySelector<HTMLElement>(".eDITPAYMENTINFO")!;
    dec1.style.display = "none";
    let dec2 = document.querySelector<HTMLElement>(".rEQUESTpAYOUT")!;
    dec2.style.display = "none";
  }
  eDITPAYMENTINFO12() {
    let dec = document.querySelector<HTMLElement>(".paymentout")!;
    dec.style.display = "none";
    let dec1 = document.querySelector<HTMLElement>(".eDITPAYMENTINFO")!;
    dec1.style.display = "block";
    let dec2 = document.querySelector<HTMLElement>(".rEQUESTpAYOUT")!;
    dec2.style.display = "none";
  }
  rEQUESTpAYOUT12() {
    let dec = document.querySelector<HTMLElement>(".paymentout")!;
    dec.style.display = "none";
    let dec1 = document.querySelector<HTMLElement>(".eDITPAYMENTINFO")!;
    dec1.style.display = "none";
    let dec2 = document.querySelector<HTMLElement>(".rEQUESTpAYOUT")!;
    dec2.style.display = "block";
  }
}
