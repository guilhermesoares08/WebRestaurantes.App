import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { CarouselTemplateComponent } from './carousel-template/carousel-template.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { RestaurantDetailComponent } from './restaurant/restaurantDetail/restaurantDetail.component';


const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  { path: 'restaurants', component: RestaurantComponent, canActivate: [AuthGuard] },
  { path: 'restaurant/:id/detail', component: RestaurantDetailComponent},
  { path: '',  component: CarouselTemplateComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**',  redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
