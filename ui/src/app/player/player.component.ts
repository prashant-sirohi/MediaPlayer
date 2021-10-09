import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, OnDestroy, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AudioService } from '../services/audio.service';
import { StreamState } from '../services/interfaces/stream.state';
import { Track } from '../tracks/interfaces';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges, OnDestroy{

  @Input() files: Array<any> = [];
  @Input() playTrack: any;

  state: StreamState;
  currentFile: any = {};
  playing: boolean = false;
  volumeSlider: boolean = false;
  apiBase = environment.apiBase;

  constructor(private audioService: AudioService) { 
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.playTrack){
      this.openFile(this.apiBase+this.playTrack.track.file.url, this.playTrack.index)
    }
  }
  ngOnDestroy(){
    this.pause();
  }

  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.playing = true;
    this.audioService.stop();
    this.playStream(file);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(this.apiBase+file.file.url, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(this.apiBase+file.file.url, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  onVolumeSliderChangeEnd(event){
    this.audioService.volume(event.value/100);
  }

  showVolume(){
    this.volumeSlider = !this.volumeSlider;
  }

}
