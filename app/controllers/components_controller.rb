class ComponentsController < ActionController::Base
  layout "component"

  def show
    @user = User.new # REFACTOR: For the forms example
    render "examples/components/#{params[:component]}"
  end
end
