require "active_support"
require "rails/engine"

module ShadcnUi
  class Engine < ::Rails::Engine
    initializer "shadcn_ui.install" do |app|
      ActiveSupport.on_load(:after_initialize) do
        ShadcnUi::Installer.install
      end
    end
  end

  class Installer
    def self.install
      new.install
    end

    def install
      check_for_tailwind
      check_for_shadcn_css
      check_for_shadcn_css_import
      check_for_shadcn_tailwind_js
      check_for_component_helper
    end

    private

    def check_for_tailwind
      tailwind_file_path = File.join(target_rails_root, "app/assets/stylesheets/application.tailwind.css")

      if File.exist?(tailwind_file_path)
        true
      else
        abort "shadcn-ui requires Tailwind CSS. Please include tailwindcss-rails in your Gemfile and run `rails g tailwindcss:install` to install Tailwind CSS."
      end
    end

    def check_for_shadcn_css
      shadcn_file_path = "app/assets/stylesheets/shadcn.css"
      if File.exist?(File.expand_path(File.join(target_rails_root, shadcn_file_path)))
        puts "...found shadcn.css"
        true
      else
        source_path = File.expand_path(File.join("../../", shadcn_file_path), __dir__)
        destination_path = File.expand_path(File.join(target_rails_root, shadcn_file_path))
        puts "...copying shadcn.css to app/assets/stylesheets/shadcn.css"
        FileUtils.cp(source_path, destination_path)
      end
    end

    def check_for_shadcn_css_import
      tailwind_file_path = File.join(target_rails_root, "app/assets/stylesheets/application.tailwind.css")

      if File.file?(tailwind_file_path)
        matched_file = File.readlines(tailwind_file_path).any? { |s| s.include?("shadcn.css") }
        if !matched_file
          puts "Importing shadcn.css into application.tailwind.css..."
          insert_import_first_line(tailwind_file_path, "@import \"shadcn.css\";")
        end
      else
        puts "application.tailwind.css does not exist."
      end
    end

    def check_for_shadcn_tailwind_js
      shadcn_tailwind_path = "config/shadcn.tailwind.js"
      if File.exist?(File.expand_path(File.join(target_rails_root, shadcn_tailwind_path)))
        puts "...found shadcn.tailwind.js"
        true
      else
        source_path = File.expand_path(File.join("../../", shadcn_tailwind_path), __dir__)
        destination_path = File.expand_path(File.join(target_rails_root, shadcn_tailwind_path))
        puts "...copying shadcn.tailwind.js to config/shadcn.tailwind.js"
        puts "Make sure to include shadcn.tailwind.js in your tailwind.config.js"
        puts "const shadcnConfig = require('./shadcn.tailwind.js');"
        puts "module.exports = {
    ...shadcnConfig,
  };"

        FileUtils.cp(source_path, destination_path)
      end
    end

    def check_for_component_helper
      component_helper_path = "app/helpers/components_helper.rb"
      if File.exist?(File.expand_path(File.join(target_rails_root, component_helper_path)))
        puts "...found components_helper.rb"
        true
      else
        source_path = File.expand_path(File.join("../../", component_helper_path), __dir__)
        destination_path = File.expand_path(File.join(target_rails_root, component_helper_path))
        puts "...copying components_helper.rb app/helpers"

        FileUtils.cp(source_path, destination_path)
      end
    end
  end
end
