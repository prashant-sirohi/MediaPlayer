class AddIndexesForSearch < ActiveRecord::Migration[6.1]
  def change
    add_index :playlists, :name
    add_index :tracks, :name
  end
end