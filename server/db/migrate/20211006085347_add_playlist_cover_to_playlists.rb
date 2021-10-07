class AddPlaylistCoverToPlaylists < ActiveRecord::Migration[6.1]
  def change
    add_column :playlists, :playlist_cover, :string
  end
end
