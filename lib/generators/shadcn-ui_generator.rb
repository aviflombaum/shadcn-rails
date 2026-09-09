require "json"
require "rails/generators/base"

class ShadcnUiGenerator < Rails::Generators::Base
  namespace "shadcn-ui"

  attr_reader :component_name, :target_rails_root, :options

  argument :component, required: false, desc: "The name of the component to install"
  argument :rails_root, required: false, desc: "Path to the Rails root directory"

  def self.banner
    "rails generate shadcn-ui <component_name> [--remove] [rails_root_path]"
  end

  def initialize(args, *options)
    super
    @component_name = component
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
      banner_line = "rails generate shadcn-ui #{component} #{" " * (20 - component.length)} #{description}"
      puts banner_line
    end
  end

  def copy_files
    return unless component_valid?
    puts "Installing #{component_name} component..."

    install_component_files(component_name)
    component_data["dependencies"]&.each do |dependency|
      if dependency.is_a?(String)
        copy_file(dependency)
      elsif dependency.is_a?(Hash)
        install_component_files(dependency["component"])
      end
    end
    puts "#{component_name.capitalize} component installed!"
  end

  def install_component_files(key)
    return unless component_valid?(key)

    available_components[key]["files"].each do |file|
      copy_file(file)
    end
  end

  def copy_file(file)
    source_path = File.expand_path(File.join("../../", file), __dir__)
    destination_path = File.expand_path(File.join(target_rails_root, file))
    if File.exist?(source_path)
      FileUtils.mkdir_p(File.dirname(destination_path))
      puts "...copying #{file}"
      FileUtils.cp(source_path, destination_path)
    end
  end

  def component_data(name = nil)
    @component_data ||= available_components[component_name]
  end

  def component_valid?(name = nil)
    name ||= component_name
    name.present? && available_components.key?(name) && component_data
  end

  def check_for_tailwind
    # Tailwind v4 uses app/assets/tailwind/application.css
    tw4_path = File.join(target_rails_root, "app/assets/tailwind/application.css")
    # Tailwind v3 used app/assets/stylesheets/application.tailwind.css
    tw3_path = File.join(target_rails_root, "app/assets/stylesheets/application.tailwind.css")

    if File.exist?(tw4_path)
      @tailwind_css_path = tw4_path
      true
    elsif File.exist?(tw3_path)
      @tailwind_css_path = tw3_path
      puts "WARNING: Detected Tailwind v3 file layout. Consider upgrading to tailwindcss-rails ~> 4.0"
      puts "         and running `rails tailwindcss:upgrade` to migrate to the new file structure."
      true
    else
      abort "shadcn-ui requires Tailwind CSS v4. Please include tailwindcss-rails (~> 4.0) in your Gemfile and run `rails tailwindcss:install` to install Tailwind CSS."
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
    return unless @tailwind_css_path && File.file?(@tailwind_css_path)

    matched_file = File.readlines(@tailwind_css_path).any? { |s| s.include?("shadcn.css") }
    if !matched_file
      puts "Importing shadcn.css into #{File.basename(@tailwind_css_path)}..."
      insert_import_after_tailwind(@tailwind_css_path, '@import "../stylesheets/shadcn.css";')
    end
  end

  def insert_import_after_tailwind(file_path, line)
    file_contents = File.read(file_path)
    # Insert after the last @import line at the top of the file
    if file_contents.match?(/^@import /)
      new_contents = file_contents.sub(/((?:@import [^\n]+\n)+)/, "\\1#{line}\n")
    else
      new_contents = "#{line}\n#{file_contents}"
    end
    File.write(file_path, new_contents)
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
