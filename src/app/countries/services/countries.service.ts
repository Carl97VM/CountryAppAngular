import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {


  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {
    //
  }
  // Funcion principal para la refactorizacion, pdst. Revisar los pipe de Angular
  private getCountriesRequest(url:string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( () => of([])),
      delay( 2000 ) // indica que demorara 2 s. en mostrar la informacion
    );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError( () => of(null) )
     );
  }

  searchCapital( term: string ): Observable<Country[]> {
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
    return this.getCountriesRequest( url );
  }
  searchCountry( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    // return this.http.get<Country[]>( url )
    // .pipe(
    //   catchError( error => {
    //     console.log(error);
    //     return of([])
    //   })
    //  );
    return this.getCountriesRequest( url );
  }
  searchRegion( region: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    // return this.http.get<Country[]>( url )
    // .pipe(
    //   catchError( error => {
    //     console.log(error);
    //     return of([])
    //   })
    //  );
    return this.getCountriesRequest( url );
  }
  // refactorizacion de codigo
}
