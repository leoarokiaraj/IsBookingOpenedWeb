import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { BookingService } from "../services/booking.service"


@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {


  minDate:Date =  new Date(new Date().getTime());
  selectedDate:Date = this.minDate
  time:any = new Date(new Date("2022-01-01 00:00"));
  constructor(public datepipe: DatePipe, private bookingService: BookingService) {
   }
   
  ngOnInit(): void {
    this.bookingService.sharedTriggerObj.trigger_date = this.datepipe.transform(this.selectedDate, 'dd-MM-yyyy')??"";
    this.bookingService.sharedTriggerObj.trigger_time = this.datepipe.transform(this.time, 'h:mm a')??"";

  }
  onDateChange(event:any):void{
    this.bookingService.sharedTriggerObj.trigger_date = this.datepipe.transform(event, 'dd-MM-yyyy')??"";
  }
  onTimeChange(event:any):void{
    this.bookingService.sharedTriggerObj.trigger_time = this.datepipe.transform(event, 'h:mm a')??"";

  }
}