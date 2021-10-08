class Track < ApplicationRecord
    has_and_belongs_to_many :playlists
    mount_uploader :cover, ImageUploader
    mount_uploader :file, MediaUploader
end
