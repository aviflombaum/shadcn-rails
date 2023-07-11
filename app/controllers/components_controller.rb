class ComponentsController < ActionController::Base
  layout "component"

  def show
    render "examples/components/#{params[:component]}"
  end
end
