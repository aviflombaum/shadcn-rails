require "json"
require "rails/generators/base"

class ShadcnUiGenerator < Rails::Generators::Base
  class_option :remove, type: :boolean, default: false, desc: "Remove the component"
  argument :component, required: false, desc: "The name of the component to install"
  argument :rails_root, required: false, desc: "Path to the Rails root directory"

  def self.banner
    "rails generate shadcn_ui <component_name>[:install] [--remove] [rails_root_path]"
  end

  def initialize(args, *options)
    super
    @rails_root = args.shift || "."
    binding.pry
  end

  def display_available_components
    puts self.class.banner
    puts "\nAvailable components:"
    components_file = File.read(File.join(@rails_root, "lib/components.json"))
    components = JSON.parse(components_file)

    components.each do |component, _|
      description = "# A #{component} component"
      banner_line = "rails g shadcn_ui #{component}:install #{" " * (20 - component.length)} #{description}"
      puts banner_line
    end
  end

  def copy_or_remove_files
    if component_valid?
      if options[:remove]
        remove_files
      else
        copy_files
      end
    end
  end

  private

  def copy_files
    template "component_template.html.erb", destination_file_path
    template "component_controller.js", controller_file_path
  end

  def remove_files
    remove_file destination_file_path
    remove_file controller_file_path
  end

  def destination_file_path
    File.join(@rails_root, "app/views/components/ui/_#{component}.html.erb")
  end

  def controller_file_path
    File.join(@rails_root, "app/javascript/controllers/ui/#{component}_controller.js")
  end

  def component_valid?
    component.present? && @available_components.key?(component.to_sym)
  end
end
