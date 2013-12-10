class Asset < ActiveRecord::Base
  belongs_to :user
  acts_as_taggable
  has_attached_file :attachment, :styles => { :medium => '300x300>', :thumb => '100x100>' }

  validates_attachment :attachment, :presence => true,
  	:content_type => { :content_type => [
    	'image/jpeg',
    	'image/png',
    	'application/pdf',
    	'application/vnd.ms-excel',
    	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    	'application/msword',
    	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    	'text/plain',
    	'image/gif',
    	'application/zip',
    	'video/x-msvideo',
    	'video/quicktime',
    	'video/mp4']
	  },
    :size => { :in => 0..10.megabytes }
end
