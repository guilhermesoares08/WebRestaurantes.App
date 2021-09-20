import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/_models/Restaurant';
import { RestaurantService } from 'src/app/_services/Restaurant.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormControlName } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, BsDatepickerInlineConfig } from 'ngx-bootstrap/datepicker';



@Component({
  selector: 'app-restaurantdetail',
  templateUrl: './restaurantDetail.component.html',
  styleUrls: ['./restaurantDetail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
 
  bsInlineValue = new Date(); 
  datepickerConfig:Partial<BsDatepickerConfig>;
  restaurantObj: Restaurant = new Restaurant();
  imagemURL = '';
  registerScheduleForm: FormGroup;
  file: File;
  fileNameToUpdate: string;
  dataAtual = '';


  
  constructor(private restaurantService: RestaurantService
    , private fb: FormBuilder   
    , private toastr: ToastrService
    , private localService: BsLocaleService
    , private router: ActivatedRoute) {
      this.localService.use('pt-br');
      this.datepickerConfig = Object.assign({}, { dateInputFormat:'DD/MM/YYYY hh:mm a' , containerClass: 'theme-red'});
      
     }

  ngOnInit() {
    this.validation();
    this.loadRestaurant();
    
  }

  validation() {
    this.registerScheduleForm = this.fb.group({
            scheduleDate: ['', Validators.required ]      
    });
  } 

  loadRestaurant(){
    const idRestaurant = +this.router.snapshot.paramMap.get('id');
    this.restaurantService.getRestaurantById(idRestaurant)
    .subscribe(
      (restaurantObj: Restaurant)=>{
        this.restaurantObj = Object.assign({}, restaurantObj);
        this.fileNameToUpdate = restaurantObj.imageURL.toString();

        this.imagemURL = `http://localhost:5000/resources/images/${this.restaurantObj.imageURL}?_ts=${this.dataAtual}`;

        this.restaurantObj.imageURL = '';
        //this.registerForm.patchValue(this.restaurantObj);
      }
    );
  }

  selectedStartDate: string;
  updateMyDate(newDate) {
    console.log(newDate);
  }

}
