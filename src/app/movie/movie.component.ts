import { Component, OnInit } from '@angular/core';
import { BookingService } from "../services/booking.service"
import { Movies, SerchClass, MovieType, Validate } from "../../entities/booking.models"



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieArr: Movies[] = [];
  searchRes: SerchClass[] = [];
  movieTypes: MovieType[] = [];
  movieTypeDefObj: MovieType = {
    "dimension": "Default dimension",
    "eventCode": "",
    "lang": "Default language"
  };
  movieResp!: any;
  highlightMovie!: Number;
  highlightMovieType!: Number;
  movieTypeLoading:boolean = false;
  noMovies:boolean=false;
  noMovieType:boolean=false;
  movieValid:Validate = new Validate();

  constructor(private bookingService: BookingService) {
    this.getMovies();
  }

  ngOnInit(): void {
    this.movieValid = this.bookingService.validateObj
    console.log(this.movieValid)
  }

  getMovies(): void {
    this.noMovieType = false;
    this.bookingService.getMovies().subscribe({

      next: data => {
        this.setMovies(data.data.splice(1, (data.data.length - 1)));
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  setMovies(data: any): void {
    this.highlightMovie = -1;
    this.highlightMovieType = -1;
    this.bookingService.sharedTriggerObj.movie_name =""
    this.bookingService.sharedTriggerObj.movie_tag =""
    this.bookingService.sharedTriggerObj.movie_id =""
    this.movieArr = data;
  }

  getMoviesParser(data: any): void {
    let searchData = data.searchData
    if (searchData?.length > 0) {
      this.movieArr = [];
      for (let index = 0; index < searchData?.length; index++) {
        let movieObj: Movies = new Movies();
        movieObj.event_code = searchData[index].id;
        movieObj.title = searchData[index].title;
        movieObj.imageURL = "https://in.bmscdn.com/webin/common/icons/search-movies.png"
        this.movieArr.push(movieObj);
      }
      this.setMovies(this.movieArr);
      this.noMovies = false;
    }
    else{
      this.movieArr = []
      this.noMovies = true;
    }
  }

  movieSearch(): void {
    let searchVal = (<any>document.getElementById("MovieSearchText")).value;
    this.movieTypes=[]
    if (searchVal != null && searchVal != "") {
      this.bookingService.getBMSSearch(1, searchVal).subscribe({

        next: data => {
          this.getMoviesParser(data);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }
    else
      this.getMovies();
  }

  movieSelected(event_code: any,title :any, index: any): void {
    this.highlightMovie = index;
    this.movieTypes = [];
    this.movieTypeLoading = true;
    this.bookingService.sharedTriggerObj.movie_name=title
    this.bookingService.sharedTriggerObj.movie_id=event_code
    this.bookingService.validateObj.is_valid_movie = true
    this.bookingService.getMovieType(event_code).subscribe({

      next: data => {
        this.setMovieType(data.retMovRespData.movieTypeResp, event_code);
        this.bookingService.sharedTriggerObj.movie_tag =data.retMovRespData.moviePath.split('/')[2]
        this.movieTypeLoading = false;
      },
      error: error => {
        console.error('There was an error!', error);
        this.movieTypeLoading = false;
      }
    })
  }

  selectMovieType(event_code: any, index: any): void {
    this.highlightMovieType = index;
    this.bookingService.sharedTriggerObj.movie_id = event_code
    this.bookingService.validateObj.is_valid_movie_type = true
    console.log(event_code)
  }

  setMovieType(data: any, event_code:any): void {
    if (data != null && data.length > 0)
    {
      this.highlightMovieType = -1;
      this.bookingService.sharedTriggerObj.movie_id =""
      let indx  = data.findIndex((i:any) => i.eventCode === event_code)
      this.selectMovieType(event_code, indx)
      this.movieTypes = data;
      this.noMovieType = false;
    }
    else
    this.noMovieType = true;
  }

  clearSearch(): void {
    this.getMovies();
    (<any>document.getElementById("MovieSearchText")).value = "";
  }

}
