class User
  include ActiveModel::API
  include ActiveModel::SecurePassword

  attr_accessor :email, :password_digest

  has_secure_password
  validates :email, presence: true
end
