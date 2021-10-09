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
  post 'playlists/add_track_to_playlist' => 'playlists#add_track_to_playlist'
  post 'playlists/add_tracks_to_playlist' => 'playlists#add_tracks_to_playlist'
  get 'search' => 'search#search'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'playlists#index'
end
