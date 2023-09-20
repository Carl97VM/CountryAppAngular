import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs'
@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(500) // esperara ese tiempo para que se pueda ejecutar lo que se requiera despues
      // en ves de estar en el servicio, el tiempo de espera esta aqui
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
      // console.log('debouncer value', value);
    } )
  }

  ngOnDestroy(): void { // destruye lo que se hacia para no cargar demas las suscripcions o obserbables
    // throw new Error('Destruido.');
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value: string) :void {
    this.onValue.emit(value);
  }

  onKeyPress( seachTerm:string ){
    // console.log(seachTerm);
    this.debouncer.next( seachTerm );

  }
}
