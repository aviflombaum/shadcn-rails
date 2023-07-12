require "rails_helper"
require_relative "../../lib/generators/shadcn_ui_generator"

RSpec.describe ShadcnUiGenerator, type: :generator do
  let(:component_name) { "accordion" }
  let(:rails_root) { "#{Rails.root}/spec/dummy_app" }

  before do
    FileUtils.mkdir_p("#{rails_root}/tmp/app")
    FileUtils.mkdir_p("#{rails_root}/tmp/app/views/components/ui")
    FileUtils.mkdir_p("#{rails_root}/tmp/app/helpers/components")
    FileUtils.mkdir_p("#{rails_root}/tmp/app/javascript/controllers/ui")
    allow_any_instance_of(described_class).to receive(:component).and_return(component_name)
  end

  after do
    FileUtils.rm_rf(rails_root)
  end

  it "copies the component files to the correct destination" do
    described_class.start(["#{component_name}:install", rails_root])

    expect(File).to exist("#{rails_root}/app/views/components/ui/_#{component_name}.html.erb")
    expect(File).to exist("#{rails_root}/app/javascript/controllers/ui/#{component_name}_controller.js")
    expect(File).to exist("#{rails_root}/app/helpers/components/#{component_name}_helper.rb")
  end
end
