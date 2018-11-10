import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { resolve as urlResolve } from 'url';
import { Bcds } from '../_classes/bcds';


@Injectable({
  providedIn: 'root'
})
export class BcdsService {

  constructor(private _http: HttpClient) { }

  get(barcode: string) {

    return this._http.get<Bcds>(urlResolve(environment.apiUrl, `bcds/${barcode}`));

  }

  add(item: Bcds) {

    return this._http.post(urlResolve(environment.apiUrl, 'bcds'), item);

  }

  edit(item: Bcds) {

    return this._http.patch(urlResolve(environment.apiUrl, 'bcds'), item);

  }

  delete(barcode: string) {

    // Workaround to make angular send data with a delete request
    // https://stackoverflow.com/questions/38819336/body-of-http-delete-request-in-angular2
    return this._http.request('DELETE', urlResolve(environment.apiUrl, 'bcds'), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { barcode: barcode }
    });

    // return this._http.delete(urlResolve(environment.apiUrl, 'shoppinglist'), item);

  }


}