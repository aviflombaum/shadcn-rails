Rails.application.routes.draw do
  # Health check for the container orchestrator. Rails 7.1 generates this as
  # rails/health#show; on 7.0 that controller does not exist, so answer inline.
  # Deliberately does not touch the database or render a view.
  get "up", to: proc { [ 200, { "Content-Type" => "text/plain" }, [ "ok" ] ] }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get "/examples/:example", to: "application#examples", as: :example
  get "/docs/components/:component", to: "components#show", as: :component
  get "/docs/components", to: redirect("/docs/components/accordion")
  get "/components", to: redirect("/docs/components/accordion"), as: :components
  get "/docs/:id" => "documentation#show", :as => :documentation, :format => false
  get "/docs", to: "documentation#index", as: :documentation_index

  # This is just for the forms component
  resources :users

  # Defines the root path route ("/")
  root "application#index"
end
