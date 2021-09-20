import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestaurantService } from '../_services/Restaurant.service';
import { Restaurant } from '../_models/Restaurant';
import {  BsModalService, BsLocaleService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal'
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-midbody',
  templateUrl: './midbody.component.html',
  styleUrls: ['./midbody.component.css']
})
export class MidbodyComponent implements OnInit {

  _filtroLista: string;
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  restaurant: Restaurant;
  
  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.filteredRestaurants = this.filtroLista
      ? this.filtrarRestaurants(this.filtroLista)
      : this.restaurants;
  }

  constructor(
    private restaurantService: RestaurantService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurant().subscribe(
      // tslint:disable-next-line: variable-name
      (_restaurants: Restaurant[]) => {
        this.restaurants = _restaurants;
        this.filteredRestaurants = this.restaurants;
      },
      error => {
        console.log(error);
      }
    );
  }

  filtrarRestaurants(filterBy: string): Restaurant[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.restaurants.filter(
      rest => rest.description.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
}
