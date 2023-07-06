Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get "/examples/:example", to: "application#examples", as: :example
  get "/components/:component", to: "components#show", as: :component
  # Defines the root path route ("/")
  root "application#index"
end
