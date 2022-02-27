import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TriggerShare,Validate } from "../../entities/booking.models"
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  sharedTriggerObj:TriggerShare = new TriggerShare();
  validateObj:Validate = new Validate();

  httpOptions:any = {
    responseType: 'text'
  };

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get<any>(environment.IsBookingOpenedServiceURL + 'api/movies')
  }

  getBMSSearch(typeID:any,searchText:any): Observable<any> {
    return this.http.get<any>(environment.IsBookingOpenedServiceURL + 
              'api/bms-search?typeID='+typeID+'&searchText='+searchText+'')
  }

  getMovieType(movieID:any): Observable<any> {
    return this.http.get<any>(environment.IsBookingOpenedServiceURL + 
              'api/bms-movie-type?movieID='+movieID+'')
  }

  getAllTriggers(): Observable<any> {
    return this.http.get<any>(environment.IsBookingOpenedAPIURL + 
              'api/Trigger/GetAllTriggers')
  }

  postAddUpdateTrigger(trigger:any): Observable<any> {
    return this.http.post<any>(environment.IsBookingOpenedAPIURL + 
              'api/Trigger/AddUpdateTrigger',trigger,this.httpOptions)
  }

  deleteTrigger(triggerId:any): Observable<any> {
    return this.http.delete<any>(environment.IsBookingOpenedAPIURL + 
              'api/Trigger/DeleteTrigger?triggerId='+triggerId+'',this.httpOptions)
  }
  
}
