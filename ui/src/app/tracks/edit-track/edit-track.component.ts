import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TracksService } from 'src/app/services/tracks.service';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.scss']
})
export class EditTrackComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private tracksService: TracksService,
    private route: ActivatedRoute,
  ) { }

  trackForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    cover: [''],
    artist: [''],
  });
  id: number;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
  }

  createTrack() {
    const name = this.trackForm.get('name')?.value
    const cover = this.trackForm.get('cover')?.value
    const artist = this.trackForm.get('artist')?.value
    this.tracksService.edit({id: this.id, name, cover, file: null, artist}).subscribe((response: any) => {
      this.gotToTrack(response.id)
    })
  }

  gotToTrack(id: number) {

  }

}
