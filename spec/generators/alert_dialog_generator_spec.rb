require "rails_helper"
require_relative "../../lib/generators/shadcn-ui_generator"

RSpec.describe ShadcnUiGenerator, type: :generator do
  let(:component_name) { "alert-dialog" }
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

    expect(File).to exist("#{rails_root}/app/views/components/ui/_alert_dialog.html.erb")
    expect(File).to exist("#{rails_root}/app/helpers/components/alert_dialog_helper.rb")
  end

  it "copies the dependency files to the correct destination" do
    expect(File).to exist("#{rails_root}/app/views/components/ui/shared/_backdrop.html.erb")
    expect(File).to exist("#{rails_root}/app/helpers/components/dialog_helper.rb")
    expect(File).to exist("#{rails_root}/app/views/components/ui/_dialog.html.erb")
    expect(File).to exist("#{rails_root}/app/javascript/controllers/ui/dialog_controller.js")
  end
end
