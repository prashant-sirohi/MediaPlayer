Rails.application.routes.draw do
  resources :playlists
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'playlists#index'
end
