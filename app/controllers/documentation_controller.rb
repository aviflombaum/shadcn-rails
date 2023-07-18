class DocumentationController < ActionController::Base
  layout "documentation"
  def index
  end

  def show
    render "documentation/#{params[:id]}"
  end
end
