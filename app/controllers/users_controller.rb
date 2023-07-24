class UsersController < ApplicationController
  layout "component"

  def create
    params[:component] = "forms"
    @user = User.new(user_params)
    if @user.valid?
      # Toast message
    else
      render "examples/components/forms", status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
