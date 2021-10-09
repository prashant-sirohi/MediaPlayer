class SearchController < ApplicationController
    def search
        @playlists = Playlist.where("name ilike ?", "%#{params[:query]}%")
        @tracks = Track.where("name ilike ?", "%#{params[:query]}%")
        render json: {tracks: @tracks, playlists: @playlists}
    end
end
