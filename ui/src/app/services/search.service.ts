import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private url = environment.apiBase + '/search';


  constructor(
    private http: HttpClient
  ) { }

  search(query: string): Observable<any> {
    return this.http.get<any>(`${this.url}/?query=${query}`)
  }
}