import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TracksService } from 'src/app/services/tracks.service';
import { environment } from 'src/environments/environment';

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
    private router: Router
  ) { }

  trackForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    artist: [''],
  });
  id: number;
  trackCover: any;
  trackCoverUrl: string;

  fileSizeLimit = 5242880; // 5 mb in bytes
  fileSizeExceeds = false;

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
    this.router.navigate([`tracks/${id}`])
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    let formData: FormData = new FormData();

    if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (file.size > this.fileSizeLimit) {
                this.fileSizeExceeds = true;
                return;
            } else {
                formData.append('file', file, file.name);
                this.tracksService.uploadTrackCover({formData, id: this.id}).subscribe(
                  event => {
                    this.trackCoverUrl = this.createImageUrl(event.cover.url)
                  },
                err => {console.log(err)});
            }
        };
    }
  }

  //TODO: create a common helper, also use in playlist show
  createImageUrl(imageUrl: string) {
    return `${environment.apiBase}${imageUrl}`
  }

}
