class Asset < ActiveRecord::Base
  belongs_to :user
  acts_as_taggable
  has_attached_file :attachment, :styles => { :medium => "300x300>", :thumb => "100x100>" }

  validates_attachment :attachment, :presence => true,
    :content_type => { :content_type => "image/jpg", :content_type => "image/png" },
    :size => { :in => 0..10.megabytes } 
end
