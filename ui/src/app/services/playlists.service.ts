import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Playlist } from '../playlists/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  private url = environment.apiBase + '/playlists';


  constructor(
    private http: HttpClient
  ) { }


  getAll(): Observable<any> {
    return this.http.get<any>(this.url)
  }

  create(playlist: Playlist): Observable<Playlist> {
    console.log("TCL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ~ file: playlists.service.ts ~ line 25 ~ PlaylistsService ~ create ~ this.url", this.url)
    return this.http.post<Playlist>(this.url, playlist)
  }
}