import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { CalDateService } from 'src/app/Services/cal-date.service';
import { FoodService } from 'src/app/Services/food.service';
@Component({
  selector: 'app-calender-buyer',
  templateUrl: './calender-buyer.component.html',
  styleUrls: ['./calender-buyer.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalenderBuyerComponent implements OnInit {

  selectedDate: Date | null;

  datesArrr: any = [];
  length = 0;
  foodID: string | null | undefined;
  foodDec12: any = [];
  minDate = new Date(new Date());
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));

  constructor(private dates: CalDateService, private food: FoodService, private activatedRoute: ActivatedRoute) {
    this.foodID = this.activatedRoute.snapshot.paramMap.get('id')
    this.getData();
    this.selectedDate = null;
  }

  ngOnInit(): void {

  }
  getData() {
    this.food.getbyId(this.foodID).then(doc => {
      let arr = []
      // console.log(doc.data());
      this.foodDec12 = doc.data()
      // console.log(this.foodDec12.uid);
      // console.log(this.foodDec12.daysData)
      for (var i = 0; i < this.foodDec12.daysData.length; i++) {
        //console.log(this.foodDec12.daysData[i].date.replace(/['"]+/g, '').substring(0, 2));
        arr.push(Number(this.foodDec12.daysData[i].date.replace(/['"]+/g, '').substring(0, 2)));
        // this.calDate.datesOfAvialableDays.push(this.foodDec12.daysData[i].date);
      }
      this.datesArrr = [...arr]
      console.log('--=-=', this.datesArrr);
    })
  }


  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      for (var i = 0; i <= this.datesArrr.length; i++) {
        console.log(this.datesArrr[i]);
        if (date === this.datesArrr[i]) {
          return true ? 'example-custom-date-class' : '';
        }
      }
    }
    return '';
  };

}
