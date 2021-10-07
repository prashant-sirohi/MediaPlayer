json.extract! track, :id, :name, :file, :cover, :artist, :created_at, :updated_at
json.url track_url(track, format: :json)
