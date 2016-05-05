class ContentType < ActiveRecord::Base
  validates :name, :creator, presence: true

  belongs_to :creator, class_name: "User"
  has_many :fields
end