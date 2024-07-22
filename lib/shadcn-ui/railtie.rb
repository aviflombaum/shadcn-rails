require "rails/railtie"

module ShadcnUi
  class Railtie < Rails::Railtie
    rake_tasks do
      load "tasks/shadcn_ui_tasks.rake"
    end
  end
end
