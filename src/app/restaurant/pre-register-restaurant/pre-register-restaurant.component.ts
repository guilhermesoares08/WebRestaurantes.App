import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pre-register-restaurant',
  templateUrl: './pre-register-restaurant.component.html',
  styleUrls: ['./pre-register-restaurant.component.css']
})
export class PreRegisterRestaurantComponent implements OnInit {

  registerRestaurantForm: FormGroup;
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.validation();
  }

  validation()  {
    this.registerRestaurantForm = this.fb.group({
      txtRestaurantName: ['',  
        [
          Validators.required, 
          Validators.minLength(4),
          Validators.maxLength(50)
        ]
      ],
      txtAreaRestaurant: [''],
      txtEmailRestaurant: ['', [Validators.required, Validators.email]],
      txtOpeningTime:[''],
      txtClosingTime:['']
     });
  }

}
