class ComponentsController < ApplicationController
  def show
    render "examples/components/#{params[:component]}"
  end
end
