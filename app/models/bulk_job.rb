class BulkJob < ActiveRecord::Base
  belongs_to :user

  serialize :log

  has_attached_file :metadata
  has_attached_file :assets

  validates_attachment :metadata, :presence => true,
                       :content_type => { :content_type => %w(text/csv text/plain) }
  validates_with AttachmentContentTypeValidator, :attributes => :assets, :content_type => 'application/zip'
  validates_presence_of :content_type
end