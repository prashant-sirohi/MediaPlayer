import { ShowPlaylistComponent } from './playlists/show-playlist/show-playlist.component';
import { NewPlaylistComponent } from './playlists/new-playlist/new-playlist.component';
import { PlaylistsComponent } from './playlists/all-Playlists/playlists.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PlaylistsComponent},
  { path: 'home', component: PlaylistsComponent},
  { path: 'new-playlist', component: NewPlaylistComponent},
  { path: 'playlist/:id', component: ShowPlaylistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
