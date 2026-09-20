require "rails/generators/base"

class ShadcnUi::InstallGenerator < Rails::Generators::Base
  namespace "shadcn-ui:install"

  desc "Sets up Shadcn by copying files and updating configurations"

  attr_reader :target_rails_root

  argument :rails_root, required: false, desc: "Path to the Rails root directory"

  def initialize(*args)
    super
    @target_rails_root = rails_root || Rails.root
  end

  def preprocess_sources
    setup_and_verify_project_dependencies
  end

  private

  def setup_and_verify_project_dependencies
    puts "Checking for tailwind..."
    puts "...tailwind found." if check_for_tailwind

    puts "Checking for shadcn.css..."
    check_for_shadcn_css

    puts "Checking for shadcn import..."
    check_for_shadcn_css_import

    puts "Checking for shadcn.tailwind.js..."
    check_for_shadcn_tailwind_js
  end

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
      return true
    end
    
    source_path = File.expand_path(File.join("../../../../", shadcn_file_path), __dir__)
    destination_path = File.expand_path(File.join(target_rails_root, shadcn_file_path))
    puts "...copying shadcn.css to app/assets/stylesheets/shadcn.css"
    FileUtils.cp(source_path, destination_path)
  end

  def check_for_shadcn_css_import
    tailwind_file_path = File.join(target_rails_root, "app/assets/stylesheets/application.tailwind.css")

    unless File.exist?(tailwind_file_path)
      puts "application.tailwind.css does not exist."
      return
    end

    File.foreach(tailwind_file_path) do |line|
      return if line.include?("shadcn.css")
    end
    
    puts "Importing shadcn.css into application.tailwind.css..."
    insert_import_first_line(tailwind_file_path, "@import \"shadcn.css\";")
  end

  def insert_import_first_line(file_path, line)
    file_contents = File.read(file_path)
    new_contents = "#{line}\n#{file_contents}"
    File.write(file_path, new_contents)
  end

  def check_for_shadcn_tailwind_js
    shadcn_tailwind_path = "config/shadcn.tailwind.js"
    destination_path = File.expand_path(File.join(target_rails_root, shadcn_tailwind_path))
    if File.exist?(destination_path)
      puts "...found shadcn.tailwind.js"
      return true
    end

    source_path = File.expand_path(File.join("../../../../", shadcn_tailwind_path), __dir__)
    puts <<~INSTRUCTIONS
    ...copying shadcn.tailwind.js to config/shadcn.tailwind.js
    Make sure to include shadcn.tailwind.js in your tailwind.config.js:

    const shadcnConfig = require('./shadcn.tailwind.js');
    module.exports = {
      ...shadcnConfig,
    };
    INSTRUCTIONS

    FileUtils.cp(source_path, destination_path)
  end
end
