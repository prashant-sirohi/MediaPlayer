class Track < ApplicationRecord
    has_and_belongs_to_many :playlists
    # mount_uploader :playlist_cover, ImageUploader
    mount_uploader :file, MediaUploader
end
