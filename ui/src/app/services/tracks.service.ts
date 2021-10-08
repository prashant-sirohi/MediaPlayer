import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Track } from '../tracks/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private url = environment.apiBase + '/tracks';


  constructor(
    private http: HttpClient
  ) { }


  getAll(): Observable<Track[]> {
    return this.http.get<Track[]>(this.url)
  }

  getOne(id: number): Observable<Track> {
    return this.http.get<Track>(`${this.url}/${id}`)
  }

  create(track: Track): Observable<Track> {
    return this.http.post<Track>(this.url, track)
  }

  edit(track: Track): Observable<Track> {
    return this.http.put<Track>(`${this.url}/${track.id}`, track)
  }

  uploadTrackFile(request: any): Observable<any> {
    return this.http.post<Track>(`${this.url}/upload_track_file`, request.formData)
  }
}