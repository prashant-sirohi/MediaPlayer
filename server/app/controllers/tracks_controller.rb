class TracksController < ApplicationController
  before_action :set_track, only: %i[ show edit update destroy upload_track_cover ]

  # GET /tracks or /tracks.json
  def index
    @tracks = Track.all
    render json: {tracks: @tracks}
  end

  def get_filtered_tracks
    @existingTrackIds = Playlist.find(params[:playlistId]).tracks.ids
    @tracks = Track.where.not(id: @existingTrackIds)
    render json: {tracks: @tracks}
  end

  # GET /tracks/1 or /tracks/1.json
  def show
    render json: {track: @track}
  end

  # GET /tracks/new
  def new
    @track = Track.new
  end

  # GET /tracks/1/edit
  def edit
  end

  # POST /tracks or /tracks.json
  def create
    @track = Track.new(track_params)
    if @track.save
      render json: @track, status: :created, location: @track
    else
      render json: @track.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tracks/1 or /tracks/1.json
  def update
    if @track.update(edit_track_params)
      render json: @track
    else
      render json: @track.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tracks/1 or /tracks/1.json
  def destroy
    @track.destroy
    respond_to do |format|
      format.html { redirect_to tracks_url, notice: "Track was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def upload_track_file
    @track = Track.new()
    @track.update!(file: params[:file])
    render json: @track
  end

  def upload_track_cover
    @track.update!(cover: params[:file])
    render json: @track
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_track
      @track = Track.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def track_params
      params.require(:track).permit(:name, :file, :cover, :artist)
    end

    def edit_track_params
      params.require(:track).permit(:name, :cover, :artist)
    end
end
