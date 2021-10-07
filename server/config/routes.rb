Rails.application.routes.draw do
  resources :tracks
  resources :playlists
  post 'playlists/upload_playlist_cover' => 'playlists#upload_playlist_cover'
  post 'playlists/add_track_to_playlist' => 'playlists#add_track_to_playlist'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'playlists#index'
end
