import { TrackLineItemComponent } from './tracks/track-line-item/track-line-item.component';
import { AllPlaylistsDialogComponent } from './playlists/all-playlists-dialog/all-playlists-dialog.component';
import { HeaderComponent } from './header/header.component';
import { NavigationService } from './services/sideNav.service';
import { TracksService } from './services/tracks.service';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AllTracksComponent } from './tracks/all-tracks/all-tracks.component';
import { ShowPlaylistComponent } from './playlists/show-playlist/show-playlist.component';
import { NewPlaylistComponent } from './playlists/new-playlist/new-playlist.component';
import { PlaylistsService } from './services/playlists.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistsComponent } from './playlists/all-Playlists/playlists.component';
import { MaterialModule } from './material.module';
import { NewTrackComponent } from './tracks/new-track/new-track.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistsComponent,
    NewPlaylistComponent,
    ShowPlaylistComponent,
    NewTrackComponent,
    AllTracksComponent,
    SideNavComponent,
    HeaderComponent,
    AllPlaylistsDialogComponent,
    TrackLineItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PlaylistsService, TracksService, NavigationService],
  bootstrap: [AppComponent],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
