require "rails_helper"
require_relative "../../../../lib/generators/shadcn-ui/install/install_generator"

RSpec.describe ShadcnUi::InstallGenerator, type: :generator do
  let(:rails_root) { "#{Rails.root}/spec/dummy_app/tmp" }

  before(:each) do
    FileUtils.mkdir_p("#{rails_root}/app")
    FileUtils.mkdir_p("#{rails_root}/config")
    FileUtils.mkdir_p("#{rails_root}/app/assets/stylesheets")
    FileUtils.touch("#{rails_root}/app/assets/stylesheets/application.tailwind.css")
  end

  after(:all) do
    FileUtils.rm_rf("#{Rails.root}/spec/dummy_app/tmp")
  end

  describe "#preprocess_sources" do
    it "copies shadcn.tailwind.js to the config" do
      generator = described_class.new([rails_root])
      generator.send(:preprocess_sources)

      expect(File).to exist("#{rails_root}/config/shadcn.tailwind.js")
    end

    it "copies shadcn.css to the stylesheets" do
      generator = described_class.new([rails_root])
      generator.send(:preprocess_sources)

      expect(File).to exist("#{rails_root}/app/assets/stylesheets/shadcn.css")
    end

    it "inserts the import line into application.tailwind.css if missing" do
      tailwind_css_path = "#{rails_root}/app/assets/stylesheets/application.tailwind.css"

      generator = described_class.new([rails_root])
      generator.send(:preprocess_sources)

      expect(File.readlines(tailwind_css_path).any? { |s| s.include?("shadcn.css") }).to be_truthy
    end
  end
end
