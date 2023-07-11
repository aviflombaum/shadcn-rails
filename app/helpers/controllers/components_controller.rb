class ComponentsController < ApplicationController
  layout "component"

  def show
    render "examples/components/#{params[:component]}"
  end
end
