class Playlist < ApplicationRecord
    mount_uploader :playlist_cover, ImageUploader
    has_and_belongs_to_many :tracks
end
