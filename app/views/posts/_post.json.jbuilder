json.extract! post, :id, :copyright_owner, :author, :title, :type, :published_at, :expired_at, :deleted_at, :created_at, :updated_at, :draft, :comment_count, :body, :short_description, :job_phase, :display, :featured_image_url, :notes, :seo_title, :seo_description, :seo_preview, :type
json.url post_url(post, format: :json)
json.tags post.tag_list.join ', '
json.categories post.categories do |c|
  json.name c.name
  json.id c.id
  json.url category_url(c, format: :json)
end
json.user do
  json.id post.user.id
  json.email post.user.email
  json.url user_url(post.user, format: :json)
end