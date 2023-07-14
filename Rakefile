# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.
require "bundler/gem_tasks"

if RAILS_ENV != "production"
  require "rspec/core/rake_task"

  RSpec::Core::RakeTask.new(:spec)

  task default: :spec
end

require_relative "config/application"

Rails.application.load_tasks
