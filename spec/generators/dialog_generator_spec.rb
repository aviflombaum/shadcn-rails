require "rails_helper"
require_relative "../../lib/generators/shadcn-ui_generator"

RSpec.describe ShadcnUiGenerator, type: :generator do
  let(:component_name) { "dialog" }
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
    described_class.start([component_name, rails_root])

    expect(File).to exist("#{rails_root}/app/views/components/ui/_#{component_name}.html.erb")
    expect(File).to exist("#{rails_root}/app/javascript/controllers/ui/#{component_name}_controller.js")
    expect(File).to exist("#{rails_root}/app/helpers/components/#{component_name}_helper.rb")
  end

  it "copies the dependency files to the correct destination" do
    generator = described_class.new(["dropdown-menu", rails_root])
    generator.send(:install_component)
    expect(File).to exist("#{rails_root}/app/views/components/ui/shared/_backdrop.html.erb")
  end
end
