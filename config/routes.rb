Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get "/examples/:example", to: "application#examples", as: :example
  get "/docs/components/:component", to: "components#show", as: :component
  get "/docs/components", to: redirect("/docs/components/accordion")
  get "/components", to: redirect("/docs/components/accordion"), as: :components
  get "/docs/:id" => "documentation#show", :as => :documentation, :format => false
  get "/docs", to: "documentation#index", as: :documentation_index

  # Defines the root path route ("/")
  root "application#index"
end
