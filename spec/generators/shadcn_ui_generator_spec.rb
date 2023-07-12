require "rails_helper"
require "generator_spec"
require_relative "../../lib/generators/shadcn_ui_generator"

RSpec.describe ShadcnUiGenerator, type: :generator do
  destination File.expand_path("../../spec/tmp/dummy_app", __dir__)

  before(:all) do
    prepare_destination
    run_generator
  end

  context "when generating a component" do
    it "copies the component files to the correct destination" do
      expect(File.exist?("spec/tmp/dummy_app/app/views/components/ui/_accordion.html.erb")).to be_truthy
      expect(File.exist?("spec/tmp/dummy_app/app/javascript/controllers/ui/accordion_controller.js")).to be_truthy
    end
  end
end
