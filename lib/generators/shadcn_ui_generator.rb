# lib/generators/shadcn_ui_generator.rb

require "rails/generators/base"

class ShadcnUiGenerator < Rails::Generators::Base
  source_root File.expand_path("path/to/source/files")

  argument :component, required: true, desc: "Name of the component"
  class_option :remove, type: :boolean, default: false, desc: "Remove the component"

  def copy_or_remove_files
    if options[:remove]
      remove_files
    else
      copy_files
    end
  end

  private

  def copy_files
    template "component_template.html.erb", destination_file_path
  end

  def remove_files
    remove_file destination_file_path
  end

  def destination_file_path
    "app/views/components/#{component}.html.erb" # Modify the destination path according to your requirements
  end
end
