class DocumentationController < ActionController::Base
  layout "documentation"
  def index
  end

  def show
    binding.pry
    render "documentation/#{params[:id]}"
  end
end
