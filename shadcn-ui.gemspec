# frozen_string_literal: true

require_relative "lib/shadcn-ui/shadcn-ui"

Gem::Specification.new do |spec|
  spec.name = "shadcn-ui"
  spec.version = ShadcnUi::VERSION
  spec.authors = ["Avi Flombaum"]
  spec.email = ["git@avi.nyc"]

  spec.summary = "Provides the shadcn-ui component library to a Ruby on Rails application."
  spec.description = "This gem is a documentation site and gem that will copy components from the shadcn-ui library into a Ruby on Rails application."
  spec.homepage = "https://github.com/aviflombaum/shadcn-rails"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 2.6.0"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/aviflombaum/shadcn-rails"
  spec.metadata["changelog_uri"] = "https://github.com/aviflombaum/shadcn-rails/tree/main/CHANGELOG.md"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(__dir__) do
    `git ls-files -z`.split("\x0").reject do |f|
      (File.expand_path(f) == __FILE__) ||
        f.start_with?(*%w[bin/ test/ spec/ features/ .git .circleci appveyor Gemfile])
    end
  end
  spec.bindir = "bin"
  spec.executables = spec.files.grep(%r{\Aexe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  # Uncomment to register a new dependency of your gem
  # spec.add_dependency "example-gem", "~> 1.0"

  # For more information and examples about making a new gem, check out our
  # guide at: https://bundler.io/guides/creating_gem.html
end
