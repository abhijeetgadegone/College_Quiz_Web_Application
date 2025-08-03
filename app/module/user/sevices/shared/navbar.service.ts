import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private _visible = new BehaviorSubject<boolean>(true);
  visible$ = this._visible.asObservable();

  hide() {
    console.log('Navbar hidden');
    this._visible.next(false);
  }
  
  show() {
    console.log('Navbar shown');
    this._visible.next(true);
  }
  
}
