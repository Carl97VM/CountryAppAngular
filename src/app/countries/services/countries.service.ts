import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {


  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    // entregamos los valores al local storage de la computadora
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    //
    if (!localStorage.getItem('cacheStore')) return;
    // el signo al final es por los parametros esperados
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  // Funcion principal para la refactorizacion, pdst. Revisar los pipe de Angular
  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        // delay( 2000 ) // indica que demorara 2 s. en mostrar la informacion
        // El delay me lo lleve al componente principal el cual escucha lo que se oprime
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {

    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    // return this.http.get<Country[]>( url )
    // .pipe(
    //   catchError( error => {
    //     console.log(error);
    //     return of([])//si la respuesta no tiene nada con el catcherror devolvemos vacion
    //     // en el front podemos jugar con eso
    //   })
    //   // tap( countries => console.log('Paso por aqui', countries)),
    //   // map(countries => []),
    //  );
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term, countries }),
        tap(() => this.saveToLocalStorage()) // le decimos que si no hay nada mas antes despues de la accion guarde los valores
      );
  }
  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    // return this.http.get<Country[]>( url )
    // .pipe(
    //   catchError( error => {
    //     console.log(error);
    //     return of([])
    //   })
    //  );
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = { term, countries }),
        tap(() => this.saveToLocalStorage())
      );
  }
  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    // return this.http.get<Country[]>( url )
    // .pipe(
    //   catchError( error => {
    //     console.log(error);
    //     return of([])
    //   })
    //  );
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries }),
        tap(() => this.saveToLocalStorage())
      );
  }
  // refactorizacion de codigo
}
