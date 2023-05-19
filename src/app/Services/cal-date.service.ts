import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalDateService implements OnInit {

  datesOfAvialableDays: any = [];

  constructor() { }
  ngOnInit(): void {
    // console.log(this.datesOfAvialableDays)
  }
}
