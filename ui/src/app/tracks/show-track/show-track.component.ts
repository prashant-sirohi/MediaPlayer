import { Track } from './../interfaces/track';
import { ActivatedRoute } from '@angular/router';
import { TracksService } from 'src/app/services/tracks.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-track',
  templateUrl: './show-track.component.html',
  styleUrls: ['./show-track.component.scss']
})
export class ShowTrackComponent implements OnInit {

  constructor(
    private tracksService: TracksService,
    private route: ActivatedRoute
  ) { }
  track: Track
  trackCoverUrl: string;
  trackSingle: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id
      this.tracksService.getOne(id).subscribe((res:any) => {
        this.track = res.track
        this.trackCoverUrl = this.createImageUrl(this.track.cover.url)
      })
    })
  }

  createImageUrl(imageUrl: string) {
    return `${environment.apiBase}${imageUrl}`
  }
  
  playTrack(track, index){
    this.trackSingle = { track: track, index: index} 
  }

}
