import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestaurantService } from '../_services/Restaurant.service';
import { Restaurant } from '../_models/Restaurant';
import { RestaurantAddress } from '../_models/RestaurantAddress';
import {  BsModalService, BsLocaleService, Utils } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal'
//import { ModalService } from '../restaurant/modal/restaurantModal/restaurantModal.component';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Constants } from '../util/Constants';
import { ToastrService } from 'ngx-toastr';
import { utils } from 'protractor';
import { Image } from '../_models/Image';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  title = 'Meus restaurantes';
  modoSalvar: string;
  _filtroLista: string;

  restaurants: Restaurant[];
  restaurantAddress: any = [];
  imagesToSave: Image[] = [];
  tmpImageToSave: Image = { id: null, url: '', extension: '' };
  filteredRestaurants: Restaurant[];
  restaurant: Restaurant;
  modalRef: BsModalRef;
  registerForm: FormGroup;
  disabledDates = [
    new Date('2019-12-05'),
    new Date('2019-12-09')
  ];
  bodyDeletarRestaurant = '';
  file: File;
  fileNameToUpdate: string;
  dataAtual: string;

  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

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
    private localeService: BsLocaleService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.getAllRestaurants();
    this.validation();
  }

  getAllRestaurants() {
    this.dataAtual = new Date().getMilliseconds().toString();
    this.restaurantService.getAllRestaurant().subscribe(
      // tslint:disable-next-line: variable-name
      (_restaurants: Restaurant[]) => {
        this.restaurants = _restaurants;
        this.filteredRestaurants = this.restaurants;
      },
      error => {
        this.toastr.error(`Erro ao tentar carregar: ${error}`);
      }
    );
  }

  filtrarRestaurants(filterBy: string): Restaurant[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.restaurants.filter(
      rest => rest.description.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  closeModal(template: any) {
    this.registerForm.reset();
    template.hide();
  }
  criaEndereco(endereco: any): FormGroup {
    return this.fb.group({
      address: [endereco.address],
      cityId: [endereco.cityId]
    });
  }

  novoRestaurante(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  editarRestaurante(restaurante: Restaurant, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.restaurant = Object.assign({}, restaurante);
    this.fileNameToUpdate = restaurante.imageURL.toString();
    this.restaurant.imageURL = '';
    this.registerForm.patchValue(this.restaurant);
  }

  salvarAlteracao(template: any) {

    if (this.registerForm.valid) {
      if (this.modoSalvar === Constants.HTTPMETHOD_POST) {
        this.restaurant = Object.assign({}, this.registerForm.value);
        this.uploadImagem();

        
        this.restaurant.environmentId = 'teste';
        // this.restaurant.images.push({ url: imagesToSave.url, extension: imagesToSave.extension });
        this.restaurantAddress.push({ address: this.registerForm.value.addressDescription, cityId: 1100015 });
        this.restaurant.addresses = Object.assign({}, this.restaurantAddress);
        // this.tmpImageToSave.url = this.file[0].name;
        
        
        
        // this.imagesToSave.push(this.tmpImageToSave);
        // this.restaurant.images = Object.assign({}, this.imagesToSave);
        // this.restaurant.addresses.push(this.restaurantAddress);
        this.restaurantService.postRestaurant(this.restaurant).subscribe(
          (responseRestaurant: Restaurant) => {
            template.hide();
            this.getAllRestaurants();
            this.toastr.success('Inserido com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Inserir: ${error}`);
          }
        );
      } else {
        this.restaurant = Object.assign({ id: this.restaurant.id, createdate: this.restaurant.createDate }, this.registerForm.value);
        this.restaurant.environmentId = 'teste';
        if (this.restaurant.addresses != null) {
          this.restaurantAddress.push({ address: 'novo', cityId: 1100015 });
          this.restaurant.addresses = Object.assign({}, this.restaurantAddress);
        }
        
          this.uploadImagem();
        
        // this.imagesToSave.push(this.tmpImageToSave);
        // this.restaurant.images = Object.assign({}, this.imagesToSave);
        this.restaurantService.putRestaurant(this.restaurant).subscribe(
          (responseRestaurant: Restaurant) => {
            template.hide();
            this.getAllRestaurants();
            this.toastr.success('Inserido com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Inserir: ${error}`);
          }
        );
      }

    }
  }

  validation() {
    this.registerForm = this.fb.group({
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      addressDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100)
        ]
      ],
      cityId: [''],
      imageURL: ['']
      // txtScheduleDate: ['', Validators.required],
      // txtScheduleHour: ['', Validators.required]
    });
  }

  excluirRestaurante(rest: Restaurant, modal: any) {
    modal.show();
    this.restaurant = rest;
    this.bodyDeletarRestaurant = `Tem certeza que deseja excluir o Restaurante: ${rest.description}, Código: ${rest.id}`;
  }

  confirmDelete(modal: any) {
    this.restaurantService.deleteRestaurant(this.restaurant.id).subscribe(
      () => {
        modal.hide();
        this.toastr.success('Deletado com sucesso');
        this.getAllRestaurants();
      }, error => {
        this.toastr.error(`Erro ao tentar deletar: ${error}`);
        console.log(error);
      }
    );
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;      
    }
  }
  

  uploadImagem() {
    if (this.modoSalvar === 'post') {
      const nomeArquivo = this.restaurant.imageURL.split('\\', 3);
      this.restaurant.imageURL = nomeArquivo[2];

      this.restaurantService.postUpload(this.file, nomeArquivo[2])
        .subscribe(
          () => {
            this.dataAtual = new Date().getMilliseconds().toString();
            this.getAllRestaurants();
          }
        );
    } else {
      this.restaurant.imageURL = this.fileNameToUpdate;
      this.restaurantService.postUpload(this.file, this.fileNameToUpdate)
        .subscribe(
          () => {
            this.dataAtual = new Date().getMilliseconds().toString();
            this.getAllRestaurants();
          }
        );
    }
  }
}
