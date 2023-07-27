# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.
require "bundler/gem_tasks"
require 'fileutils'

if ENV["RAILS_ENV"] != "production"
  require "rspec/core/rake_task"

  RSpec::Core::RakeTask.new(:spec)

  task default: :spec
end

require_relative "config/application"

Rails.application.load_tasks
# Rake task

HELPER_TEMPLATE = <<~TEMPLATE
module Components::<%= component_name %>Helper
end
TEMPLATE

STIMULUS_TEMPLATE = <<~TEMPLATE
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
}
TEMPLATE

def documentation_erb(name)
  content  = <<~TEMPLATE
<%= render "layouts/documentation/component_header",
  title: "#{name.capitalize}",
  description: "" %>

<% content_for :preview, flush: true do %>
<div class="w-full flex justify-center">
  <%= render_code_preview('#{name}') %>
</div>
<% end %>

<% content_for :code, flush: true do %>
<div class="w-full flex justify-center">
  <%= code_partial("#{name}/preview", :erb) %>
</div>
<% end %>

<%= render_preview %>

<h2 class="font-heading scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0" id="installation">Installation</h2>
<%= code_sample(language: "sh") do %>
  rails generate shadcn-ui #{name}
<% end %>

<h2 class="font-heading mt-12 scroll-m-20 border-b pb-2 mb-2 text-2xl font-semibold tracking-tight first:mt-0" id="usage">Usage</h2>
<%= code_partial("#{name}/usage", :erb) %>

<%= render_usage("#{name}") %>
TEMPLATE
end

namespace :component do
  desc "Generate a new component"
  task :generate => :environment do
    name = ENV['name']
    abort("No component name provided. Use `rake component:generate name=component_name`") unless name.present?

    puts "Do you want to include a Stimulus controller? (yes/no)"
    response = STDIN.gets.chomp.downcase

    component_view_path = Rails.root.join("app", "views", "components", "ui", "_#{name}.html.erb")
    helper_path = Rails.root.join("app", "helpers", "components", "#{name}_helper.rb")
    controller_path = Rails.root.join("app", "javascript", "controllers", "ui", "#{name}_controller.js")

    documentation_path = Rails.root.join("app", "views", "examples", "components", "#{name}.html.erb")
    preview_path = Rails.root.join("app", "views", "examples", "components", name, "code", "_preview.html.erb")
    preview_directory_path = Rails.root.join("app", "views", "examples", "components", name, "code")
    preview_file_path = "#{preview_directory_path}/_preview.erb"
    sample_usage_path = "#{preview_directory_path}/_usage.erb"
    usage_instructions_path = Rails.root.join("app", "views", "examples", "components", name, "_usage.html.erb")

    camelized_name = name.camelize
    helper_template = ERB.new(HELPER_TEMPLATE)
    helper_content = helper_template.result_with_hash(component_name: camelized_name)

    stimulus_template = ERB.new(STIMULUS_TEMPLATE)
    stimulus_content = stimulus_template.result

    File.new(component_view_path, "w")
    File.open(helper_path, "w") { |file| file.write(helper_content) }

    File.open(documentation_path, "w") { |file| file.write(documentation_erb(name)) }
    FileUtils.mkdir_p(preview_directory_path)
    File.new(preview_file_path, "w")
    File.new(sample_usage_path, "w")
    File.new(usage_instructions_path, "w")

    if ["yes", "y"].include?(response.downcase)
      File.open(controller_path, "w") { |file| file.write(stimulus_content) }
    end

    puts "Component #{name} was created successfully!"
  end
end
