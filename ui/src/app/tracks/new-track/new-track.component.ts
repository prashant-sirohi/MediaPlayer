import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TracksService } from 'src/app/services/tracks.service';

@Component({
  selector: 'app-new-track',
  templateUrl: './new-track.component.html',
  styleUrls: ['./new-track.component.scss']
})
export class NewTrackComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private tracksService: TracksService,
    private router: Router,
  ) { }

  trackForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    cover: [''],
    file: [''],
    artist: [''],
  });

  ngOnInit(): void {
  }

  createTrack() {
    const name = this.trackForm.get('name')?.value
    const cover = this.trackForm.get('cover')?.value
    const file = this.trackForm.get('file')?.value
    const artist = this.trackForm.get('artist')?.value
    this.tracksService.create({name, cover, file, artist}).subscribe((response: any) => {
      this.gotToTrack(response.id)
    })
  }

  gotToTrack(id: number) {

  }

}
