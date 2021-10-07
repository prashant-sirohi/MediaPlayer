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


  getAll(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.url)
  }

  getOne(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.url}/${id}`)
  }

  create(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.url, {name: playlist.name, description: playlist.description, playlist_cover: playlist.playlistCover})
  }

  uploadPlaylistCover(request: any): Observable<any> {
    return this.http.post<Playlist>(`${this.url}/upload_playlist_cover`, request)
  }

  addTrackToPlaylist(request: {trackId: number, playlistId: number}) {
    const {trackId, playlistId} = request;
    return this.http.post<Playlist>(`${this.url}/add_track_to_playlist`, {track_id: trackId, playlist_id: playlistId})
  }
}