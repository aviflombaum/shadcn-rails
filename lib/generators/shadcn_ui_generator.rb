require "json"
require "rails/generators/base"

class ShadcnUiGenerator < Rails::Generators::Base
  attr_reader :component_name, :target_rails_root, :options

  argument :component, required: false, desc: "The name of the component to install"
  argument :rails_root, required: false, desc: "Path to the Rails root directory"

  def self.banner
    "rails generate shadcn_ui <component_name>[:install] [--remove] [rails_root_path]"
  end

  def initialize(args, *options)
    super
    @component_name = (component.present? && component.include?(":")) ? component.split(":").first : component
    @target_rails_root = rails_root || Rails.root
    @options = options.first
  end

  def preprocess_sources
    check_target_app
  end

  def install_component
    if component_valid?
      copy_files
    else
      display_available_components
    end
  end

  private

  def check_target_app
    puts "Checking for tailwind..."
    puts "...tailwind found." if check_for_tailwind

    puts "Checking for shadcn.css..."
    check_for_shadcn_css

    puts "Checking for shadcn import..."
    check_for_shadcn_css_import

    puts "Checking for shadcn.tailwind.js..."
    check_for_shadcn_tailwind_js

    puts "Checking for component_helper.rb"
    check_for_component_helper
  end

  def available_components
    if !@available_components
      gem_lib_path = File.expand_path("../../lib", __dir__)
      components_file = File.read(File.join(gem_lib_path, "components.json"))
      @available_components = JSON.parse(components_file)
    else
      @available_components
    end
  end

  def display_available_components
    puts self.class.banner
    puts "\nAvailable components:"

    available_components.each do |component, _|
      description = "# A #{component} component"
      banner_line = "rails g shadcn_ui #{component}:install #{" " * (20 - component.length)} #{description}"
      puts banner_line
    end
  end

  def copy_files
    if component_valid?
      puts "Installing #{component_name} component..."
      component_data["files"].each do |file|
        source_path = File.expand_path(File.join("../../", file), __dir__)
        destination_path = File.expand_path(File.join(target_rails_root, file))
        if File.exist?(source_path)
          FileUtils.mkdir_p(File.dirname(destination_path))
          puts "...copying #{file}"
          FileUtils.cp(source_path, destination_path)
        end
      end
      puts "#{component_name.capitalize} component installed!"
    end
  end

  def component_data
    @component_data ||= available_components[component_name]
  end

  def component_valid?
    component_name.present? && available_components.key?(component_name) && component_data
  end

  def check_for_tailwind
    tailwind_file_path = File.join(target_rails_root, "app/assets/stylesheets/application.tailwind.css")

    if File.exist?(tailwind_file_path)
      true
    else
      abort "shadcn-ui requires Tailwind CSS. Please include tailwindcss-rails in your Gemfile and run `rails g tailwind:install` to install Tailwind CSS."
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

  def insert_import_line(file_path, line)
    file_contents = File.read(file_path)
    new_contents = file_contents.gsub(/@tailwind\s+utilities;/, "\\0\n#{line}\n")
    File.write(file_path, new_contents)
  end

  def insert_import_first_line(file_path, line)
    file_contents = File.read(file_path)
    new_contents = "#{line}\n#{file_contents}"
    File.write(file_path, new_contents)
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

# Two things - you need the helper helpers
# you have to put @import on the 3rd line after the tailwind directives? Is that possible? It's because of border-border...worse case you can just use the actual styles
