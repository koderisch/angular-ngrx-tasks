import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../../store/actions/counter.actions';

@Component({
  selector: 'app-ngrx-test1',
  templateUrl: './ngrx-test1.component.html',
  styleUrls: ['./ngrx-test1.component.css']
})
export class NgrxTest1Component {

  count$: Observable<number>;
 
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select('count'));
  }
 
  increment() {
    this.store.dispatch(increment());
    console.log(this.count$);
  }
 
  decrement() {
    this.store.dispatch(decrement());
  }
 
  reset() {
    this.store.dispatch(reset());
  }


}
