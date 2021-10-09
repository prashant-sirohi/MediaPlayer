import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Playlist } from '../playlists/interfaces';
import { Track } from '../tracks/interfaces';
import _ from 'lodash'

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

  getFilteredPlaylists(trackId: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.url}/get_filtered_playlists/${trackId}`)
  }

  getOne(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.url}/${id}`)
  }

  create(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.url, {playlist})
  }

  uploadPlaylistCover(request: {formData: FormData, id: number}): Observable<any> {
    return this.http.post<Playlist>(`${this.url}/${request.id}/upload_playlist_cover`, request.formData)
  }

  addTrackToPlaylist(request: {trackId: number, playlistIds: number[]}) {
    const {trackId, playlistIds} = request;
    return this.http.post<Playlist>(`${this.url}/add_track_to_playlist`, {track_id: trackId, playlist_ids: playlistIds})
  }

  addTracksToPlaylist(request: {tracks: Track[], playlistId: number}) {
    const {tracks, playlistId} = request;
    const trackIds = _.map(tracks, 'id');
    return this.http.post<Playlist>(`${this.url}/add_tracks_to_playlist`, {trackIds, playlist_id: playlistId})
  }
}