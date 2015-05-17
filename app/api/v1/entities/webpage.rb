module API
  module V1
    module Entities
      class Webpage < Grape::Entity
        expose :id, documentation: { type: 'Integer', desc: 'Webpage ID', required: true }
        expose :user, with: 'Entities::User', documentation: {type: 'User', desc: 'Owner'}
        expose :name, documentation: { type: 'String', desc: 'Webpage Name', required: true }
        expose :created_at, documentation: { type: 'dateTime', desc: 'Created Date'}
        expose :updated_at, documentation: { type: 'dateTime', desc: 'Updated Date'}
        expose :url, documentation: { type: 'String', desc: 'URL of Webpage' }
        expose :tile_thumbnail, if: lambda { |webpage, _| webpage.has_thumbnail? }, documentation: {desc: 'URL Thumbnail - Tile Size'} do |webpage| webpage.thumbnail.url(:tile) end
        represent :snippets, with: 'Entities::Snippet', documentation: {type: 'Snippet', is_array: true, desc: 'All associated Snippets for this Webpage'}
      end
    end
  end
end
