# MediaPlayer
This is a demo project showing off a very light weight media player

# Functionalities
- Create playlists
- Create tracks
- Add tracks to playlist
- Add playlist to track
- Play songs
- Simple Typeahead search for songs and playlists

# What is doesn't do
- User management

# How to test
- Clone the repo
- go to `/server`
  - `bundle install`
  - `rails db:create`
  - `rails db:migrate`
  - `rails s`
- go to `/ui`
  - `npm i`
  - `npm start`
