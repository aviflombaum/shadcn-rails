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

    @component_name = component
    @target_rails_root = rails_root || Rails.root
    @options = options.first
    start
  end

  private

  def start
    if component_valid?
      copy_files
    else
      display_available_components
    end
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
      component_data["files"].each do |file|
        source_path = File.expand_path(File.join("../../", file), __dir__)
        destination_path = File.expand_path(File.join(target_rails_root, file))

        FileUtils.mkdir_p(File.dirname(destination_path))
        FileUtils.cp(source_path, destination_path)
      end
    end
  end

  def destination_file_path
    File.join(@rails_root, "app/views/components/ui/_#{component}.html.erb")
  end

  def controller_file_path
    File.join(@rails_root, "app/javascript/controllers/ui/#{component}_controller.js")
  end

  def component_data
    @component_data ||= available_components[component]
  end

  def component_valid?
    component.present? && available_components.key?(component) && component_data
  end
end
