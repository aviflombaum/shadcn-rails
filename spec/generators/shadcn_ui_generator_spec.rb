require "rails_helper"
require_relative "../../lib/generators/shadcn_ui_generator"

RSpec.describe ShadcnUiGenerator, type: :generator do
  let(:component_name) { "accordion" }
  let(:rails_root) { "#{Rails.root}/spec/dummy_app/tmp" }

  before(:each) do
    FileUtils.mkdir_p("#{rails_root}/app")
    FileUtils.mkdir_p("#{rails_root}/config")
    FileUtils.mkdir_p("#{rails_root}/app/views/components/ui")
    FileUtils.mkdir_p("#{rails_root}/app/helpers/components")
    FileUtils.mkdir_p("#{rails_root}/app/javascript/controllers/ui")
    FileUtils.mkdir_p("#{rails_root}/app/assets/stylesheets")
    FileUtils.touch("#{rails_root}/app/assets/stylesheets/application.tailwind.css")
  end

  after(:all) do
    FileUtils.rm_rf("#{Rails.root}/spec/dummy_app/tmp")
  end

  it "copies the component files to the correct destination" do
    described_class.start(["#{component_name}:install", rails_root])

    expect(File).to exist("#{rails_root}/app/views/components/ui/_#{component_name}.html.erb")
    expect(File).to exist("#{rails_root}/app/javascript/controllers/ui/#{component_name}_controller.js")
    expect(File).to exist("#{rails_root}/app/helpers/components/#{component_name}_helper.rb")
  end

  it "copies the dependency files to the correct destination" do
    generator = described_class.new(["dropdown-menu:install", rails_root])
    generator.send(:install_component)

    expect(File).to exist("#{rails_root}/app/views/components/ui/_popover.html.erb")
    expect(File).to exist("#{rails_root}/app/views/components/ui/shared/_menu_item.html.erb")
    expect(File).to exist("#{rails_root}/app/javascript/controllers/ui/popover_controller.js")
    expect(File).to exist("#{rails_root}/app/helpers/components/popover_helper.rb")
    expect(File).to exist("#{rails_root}/app/views/components/ui/_dropdown_menu.html.erb")
    expect(File).to exist("#{rails_root}/app/javascript/controllers/ui/dropdown_controller.js")
    expect(File).to exist("#{rails_root}/app/helpers/components/dropdown_menu_helper.rb")
  end

  it "copies shadcn.css to the stylesheets" do
    generator = described_class.new(["#{component_name}:install", rails_root])
    generator.send(:preprocess_sources)

    expect(File).to exist("#{rails_root}/app/assets/stylesheets/shadcn.css")
  end

  it "copies shadcn.tailwind.js to the config" do
    generator = described_class.new(["#{component_name}:install", rails_root])
    generator.send(:preprocess_sources)

    expect(File).to exist("#{rails_root}/config/shadcn.tailwind.js")
  end

  it "inserts the import line into application.tailwind.css if missing" do
    tailwind_css_path = "#{rails_root}/app/assets/stylesheets/application.tailwind.css"

    generator = described_class.new(["#{component_name}:install", rails_root])
    generator.send(:preprocess_sources)

    expect(File.read(tailwind_css_path)).to include('@import "shadcn.css";')
  end
end
