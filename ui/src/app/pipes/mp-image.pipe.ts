import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'mpImage'
})
export class MpImagePipe implements PipeTransform {
  defaultPlaylistUrl = 'http://localhost:4200/assets/default_playlist_cover.jpg';

  transform(url: string): unknown {
    if(!url) {
      return this.defaultPlaylistUrl
    }
    return `${environment.apiBase}${url}`;
  }

}
