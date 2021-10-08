Rails.application.routes.draw do
  resources :tracks
  resources :playlists do
    member do
      post :upload_playlist_cover
    end
  end
  post 'tracks/upload_track_file' => 'tracks#upload_track_file'
  post 'playlists/add_track_to_playlist' => 'playlists#add_track_to_playlist'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'playlists#index'
end
