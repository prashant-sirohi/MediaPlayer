Rails.application.routes.draw do
  resources :tracks do
    member do
      post :upload_track_cover
    end
  end
  resources :playlists do
    member do
      post :upload_playlist_cover
    end
  end
  post 'tracks/upload_track_file' => 'tracks#upload_track_file'
  get 'tracks/get_filtered_tracks/:playlistId' => 'tracks#get_filtered_tracks'
  get 'playlists/get_filtered_playlists/:trackId' => 'playlists#get_filtered_playlists'
  post 'playlists/add_track_to_playlist' => 'playlists#add_track_to_playlist'
  post 'playlists/add_tracks_to_playlist' => 'playlists#add_tracks_to_playlist'
  get 'search' => 'search#search'
  root to: 'playlists#index'
end
