class ComponentPage < Sitepress::Model
  collection glob: "components/*.html*"
  data :title

  def gravatar_image_url
    "https://www.gravatar.com/avatar/#{Digest::MD5.hexdigest(email)}"
  end
end
