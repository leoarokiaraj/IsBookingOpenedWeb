import { Component, OnInit } from '@angular/core';
import {BookingService} from "../services/booking.service"
import {SerchClass, Validate} from "../../entities/booking.models"


@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {

  highlightTheater : Number = -1;   
  searchRes:SerchClass[] = [];
  theaterValid:Validate = new Validate();
  noTheater:boolean = false
  theaterLoading:boolean=false
  defaultTheaters:SerchClass[] = [ ];



  constructor(private bookingService: BookingService) { 

    this.theaterValid = this.bookingService.validateObj
  }

  ngOnInit(): void {
    this.searchRes = [];
    this.searchRes = this.defaultTheaters;
  }

  theaterSearch():void {
    let searchVal = (<any>document.getElementById("TheaterSearchText")).value;
    this.searchRes=[]
    this.theaterLoading = true
    this.noTheater = false
    this.highlightTheater = -1;
    this.bookingService.sharedTriggerObj.theater_id=""
    this.bookingService.sharedTriggerObj.theater_name=""
    if (searchVal != null && searchVal != "")
    {
      this.bookingService.getBMSSearch(2,searchVal).subscribe({

        next: data => {
          this.theaterLoading = false
          this.searchRes = data.searchData;
          if (this.searchRes != null && this.searchRes.length > 0)
          {
            this.searchRes.forEach(element => {
              element.imageURL="../../assets/default_theater.PNG"
            });
          }
          else
            this.noTheater = true
          
        },
        error: error => {
          this.theaterLoading = false
          this.noTheater = true
          console.error('There was an error!', error);
        }
      })
    }
    else
    {
      this.searchRes = [];
      this.searchRes = this.defaultTheaters;
    }

  }

  theaterSelected(id:any,title:any, index:any):void{
    this.highlightTheater = index; 
    this.bookingService.sharedTriggerObj.theater_id=id
    this.bookingService.sharedTriggerObj.theater_name=title
    this.bookingService.validateObj.is_valid_theater = true
  }
  clearSearch():void{
    this.noTheater = false
    this.searchRes = [];
    this.searchRes = this.defaultTheaters;
    (<any>document.getElementById("TheaterSearchText")).value = "";
  }
}
