import { Component, OnInit } from '@angular/core';
import { BookingService } from "../services/booking.service"
import { Trigger } from "../../entities/booking.models"
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-triggers',
  templateUrl: './triggers.component.html',
  styleUrls: ['./triggers.component.css']
})
export class TriggersComponent implements OnInit {

  noTrigger:boolean = false;

  triggerData:Trigger[] = []

  
  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.getAllTriggers();
    
  }

  getAllTriggers():void{
    this.noTrigger = false;
    this.triggerData = []
    this.bookingService.getAllTriggers().subscribe({

      next: data => {
        if (data != null && data.length > 0)
        {
          this.triggerData = data
        }
        else 
          this.noTrigger = true;
        
        console.log(data)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  deleteButtonClick(trigger:any):void{
  console.log(trigger)
  this.bookingService.deleteTrigger(trigger.trigger_id).subscribe({

    next: data => {
      this.getAllTriggers();
      console.log(data)
    },
    error: error => {
      console.error('There was an error!', error);
    }
  })
  }

  updateButtonClick(trigger:any):void{
    console.log(trigger)
    this.bookingService.postAddUpdateTrigger(trigger).subscribe({

    next: data => {
      this.getAllTriggers();
      console.log(data)
    },
    error: error => {
      console.error('There was an error!', error);
    }
  })
    
  }

  CreateTrigger():void{
    console.log(this.bookingService.sharedTriggerObj)
    if (this.validateTrigger())
    {
      let triggerObj = this.formTriggerObj()
      this.bookingService.postAddUpdateTrigger(triggerObj).subscribe({

        next: data => {
          this.getAllTriggers();
          console.log(data)
        },
        error: error => {
          console.log('There was an error!', error);
        }
      })
    }
    
  }

  validateTrigger():Boolean{
    let valid:Boolean = true;
    if(this.bookingService.sharedTriggerObj.movie_name == null
       || this.bookingService.sharedTriggerObj.movie_name == "")
    {
      this.bookingService.validateObj.is_valid_movie = false
      valid = false;
    }
    if(this.bookingService.sharedTriggerObj.movie_id == null
      || this.bookingService.sharedTriggerObj.movie_id == "")
    {
      this.bookingService.validateObj.is_valid_movie_type = false
      valid = false;
    }
    if(this.bookingService.sharedTriggerObj.theater_name == null
      || this.bookingService.sharedTriggerObj.theater_name == "")
    {
      this.bookingService.validateObj.is_valid_theater = false
      valid = false;
    }
    if(this.bookingService.sharedTriggerObj.trigger_time == null
      || this.bookingService.sharedTriggerObj.trigger_time == "")
    {
      this.bookingService.validateObj.is_valid_time = false
      valid = false;
    }

    return  valid;

  }

  formTriggerObj():Trigger{
    let triggerObj:Trigger = new Trigger()
    let dateArr:any[] = this.bookingService.sharedTriggerObj.trigger_date.split('-') 

    triggerObj.movie_name = this.bookingService.sharedTriggerObj.movie_name
    triggerObj.theater_id = this.bookingService.sharedTriggerObj.theater_id
    triggerObj.theater_name = this.bookingService.sharedTriggerObj.theater_name
    triggerObj.trigger_date = this.bookingService.sharedTriggerObj.trigger_date
    triggerObj.trigger_time = this.bookingService.sharedTriggerObj.trigger_time
    triggerObj.trigger_status = 0
    triggerObj.trigger_url = this.bookingService.sharedTriggerObj.movie_tag + '-'+
                              environment.Location + '/movie-' +
                              environment.LocationID +'-'+ this.bookingService.sharedTriggerObj.movie_id +
                              '-MT/' + 
                              dateArr[2]+dateArr[1]+dateArr[0]
    console.log(triggerObj)
    return triggerObj
  }

}
