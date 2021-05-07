import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Flight } from '../flights.model';
import { exhaustMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  flightSubject = new Subject();

  flightSubject$: Observable<Flight[]> = this.flightSubject.asObservable().pipe(
    exhaustMap((resp) => {
      const url = 'http://www.angular.at/api/flight?from=F';
      const headers = new HttpHeaders().set('Accept', 'application/json');
      return this.http.get<Flight[]>(url, { headers });
    }),
       // delay(5000),
      // concatMap(
      //   const url = 'http://angular.at/api/flight?from=G';
      // ),
      // tap(),
      // setInterval(),
      // mergeMap()
  );

  ngOnInit(): void {}

  clickAction(): any {
    this.flightSubject.next();
  }

}


  // flights$: Observable<Flight[]> = this.load().pipe(
  //   map((jsonResponse) => {
  //     return jsonResponse;
  //   })
  // );

  // flights$: Observable<Flight[]> = this.flights.asObservable().pipe(
  //   exhaustMap((resp) => {
  //     return this.load().pipe(
  //       map((jsonResponse) => {
  //         return jsonResponse;
  //       })
  //     );
  //   })
  // );

  // load(): Observable<Flight[]> {
  //   const url = 'http://www.angular.at/api/flight?from=F';
  //   const headers = new HttpHeaders().set('Accept', 'application/json');
  //   return this.http.get<Flight[]>(url, { headers });
  // }
