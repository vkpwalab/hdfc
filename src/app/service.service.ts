import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }
  header_title=new BehaviorSubject('Dashboard')
  headerTitle(v)
  {
    this.header_title.next(v)
  }
}
