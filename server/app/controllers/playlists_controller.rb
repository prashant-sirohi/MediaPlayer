class PlaylistsController < ApplicationController
  before_action :set_playlist, only: %i[ show edit update destroy ]

  # GET /playlists or /playlists.json
  def index
    @playlists = Playlist.all
    render json: @playlists, include: ['tracks'], meta: { total: Track.count }
  end

  def get_filtered_playlists
    @existingPlaylistIds = Track.find(params[:trackId]).playlists.ids
    @playlists = Playlist.where.not(id: @existingPlaylistIds)
    render json: {playlists: @playlists}
  end

  # GET /playlists/1 or /playlists/1.json
  def show
    render json: @playlist.to_json(include: :tracks)
  end

  # GET /playlists/new
  def new
    @playlist = Playlist.new
  end

  # GET /playlists/1/edit
  def edit
  end

  # POST /playlists or /playlists.json
  def create
    @playlist = Playlist.new(playlist_params)
    if @playlist.save
      render json: @playlist, status: :created, location: @playlist
    else
      render json: @playlist.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /playlists/1 or /playlists/1.json
  def update
    respond_to do |format|
      if @playlist.update(playlist_params)
        format.html { redirect_to @playlist, notice: "Playlist was successfully updated." }
        format.json { render :show, status: :ok, location: @playlist }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @playlist.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /playlists/1 or /playlists/1.json
  def destroy
    @playlist.destroy
    respond_to do |format|
      format.html { redirect_to playlists_url, notice: "Playlist was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def upload_playlist_cover
    @playlist = Playlist.find(params[:id])
    @playlist.update!(playlist_cover: params[:file])
    render json: @playlist
  end

  def add_track_to_playlist
    @playlists = Playlist.where(id: params[:playlist_ids])
    @track = Track.find(params[:track_id])
    for playlist in @playlists do
      playlist.tracks << @track
      playlist.save()
    end
    render json: @track
  end

  def add_tracks_to_playlist
    @playlist = Playlist.find(params[:playlist_id])
    @playlist.tracks << Track.where(id: params[:trackIds]).all
    @playlist.save()
    render json: @playlist.to_json(include: :tracks)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_playlist
      @playlist = Playlist.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def playlist_params
      params.require(:playlist).permit(:name, :description, :playlist_cover)
    end
end
