import { Component } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {
  searchByCapital( term: string ){
    console.log('Desde el capital page');

    console.log({term});

  }
}
