import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TracksService } from 'src/app/services/tracks.service';
import { Track } from '../interfaces';

@Component({
  selector: 'app-all-tracks',
  templateUrl: './all-tracks.component.html',
  styleUrls: ['./all-tracks.component.scss']
})
export class AllTracksComponent implements OnInit {

  tracks: Track[] = [];
  currentActiveTrack: any;
  playingTrackId: number;

  constructor(
    private tracksService: TracksService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tracksService.getAll().subscribe((data: any)=> {
      this.tracks = data.tracks;
    })
  }

  goToNewTrack() {
    this.router.navigate(['new-track'])
  }

  onPlayCommand(event){
    this.currentActiveTrack = event;
  }

  onPlayingTrackChange(event){
    this.playingTrackId = event.track.id
  }

}
