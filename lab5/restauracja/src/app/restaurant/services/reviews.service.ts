import { Injectable } from '@angular/core';
import {Review} from "../interfaces/review.module";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  reviews: Review[] = []
  constructor() { }

}
