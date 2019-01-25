import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { resolve as urlResolve } from 'url';

export class Stats {

  constructor (
    public bcds_entries: number,
    public registerd_users: number,
    public uptime: number
  ) {}

}

interface IVersion {
  version: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private _http: HttpClient) { }

  stats() {
    return this._http.get<Stats>(urlResolve(environment.apiUrl, 'admin/stats'));
  }

  version() {
    return this._http.get<IVersion>(urlResolve(environment.apiUrl, '/version'));
  }

}