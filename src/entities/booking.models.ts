export class Movies {
    title!: string
    event_code!: string
    imageURL!: string
}

export class SerchClass {
    title!: string
    id!: string
    imageURL!: string
}

export class MovieType {
    dimension!: string
    eventCode!: string
    lang!: string
}

export class Trigger {
    trigger_id!:number
    movie_name!:string 
    theater_name!:string 
    theater_id!:string         
    trigger_url!:string 
    trigger_status!:number 
    trigger_date!:string 
    trigger_time!:string
    created_on!:any 
    updated_on!:any 
}

export class TriggerShare {
    movie_name:string 
    movie_id:string 
    movie_tag:string 
    theater_name:string 
    theater_id:string         
    trigger_date:string 
    trigger_time:string
    constructor(){
        this.movie_name="" 
        this.movie_id=""
        this.movie_tag= ""
        this.theater_name=""
        this.theater_id=""    
        this.trigger_date="" 
        this.trigger_time=""
    }
}

export class Validate {
    is_valid_movie:boolean = true
    is_valid_movie_type:boolean = true
    is_valid_theater:boolean = true 
    is_valid_date:boolean = true
    is_valid_time:boolean = true
    constructor() {
        this.is_valid_movie = true
        this.is_valid_movie_type = true
        this.is_valid_theater = true 
        this.is_valid_date = true
        this.is_valid_time = true
    }
}