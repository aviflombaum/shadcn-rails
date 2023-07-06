class ApplicationController < ActionController::Base
  def index
  end

  def examples
    render "examples/authentication/index"
  end
end
