import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TooltipModule, ModalModule, BsDropdownModule, CarouselModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

import { defineLocale, BsLocaleService, ptBrLocale, BsDatepickerModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
defineLocale('pt-br', ptBrLocale);

import { RestaurantService } from './_services/Restaurant.service';

import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { NavComponent } from './nav/nav.component';
import { CarouselTemplateComponent } from './carousel-template/carousel-template.component';

import { fromEventPattern } from 'rxjs';

import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { MidbodyComponent } from './midbody/midbody.component';
import { TituloComponent } from './_shared/titulo/titulo.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RestaurantDetailComponent } from './restaurant/restaurantDetail/restaurantDetail.component';



@NgModule({
   declarations: [
      AppComponent,
      RestaurantComponent,
      NavComponent,
      DateTimeFormatPipePipe,
      CarouselTemplateComponent,
      MidbodyComponent,
      TituloComponent,
      UserComponent,
      LoginComponent,
      RegistrationComponent,
      RestaurantDetailComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      ReactiveFormsModule,
      BsDatepickerModule.forRoot(),
      TimepickerModule.forRoot(),
      BrowserAnimationsModule,
      ToastrModule.forRoot({
         timeOut: 10000,
         positionClass: 'toast-bottom-right',
         preventDuplicates: true,
       }),
       TabsModule.forRoot(),
       NgxMaskModule.forRoot(),
       CarouselModule.forRoot()
   ],
   providers: [
      RestaurantService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
