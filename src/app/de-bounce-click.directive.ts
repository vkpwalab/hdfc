import { Directive, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDeBounceClick]'
})
export class DeBounceClickDirective implements OnInit, OnDestroy {

  @Input()
  debounceTime = 500;

  @Output() debounceClick = new EventEmitter();


  private clicks = new Subject();
  private subscription: Subscription;


  constructor() {


  }


  ngOnInit() {
    this.subscription = this.clicks.pipe(
      debounceTime(this.debounceTime)
    ).subscribe((e:any) => this.debounceClick.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

}
