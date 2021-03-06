import { Image } from './Image';
import { RestaurantAddress } from './RestaurantAddress';
import { RestaurantOpeningHour } from './RestaurantOpeningHour';

export class Restaurant {
  id: number;
  description: string;
  email: string;
  ownerId: number;
  createDate: Date;
  updateDate: Date;
  vendorId: string;
  environmentId: string;
  images: Image[];
  imageURL: string;
  phone: string;
  addresses: RestaurantAddress[];
  openingHour: RestaurantOpeningHour;
}
