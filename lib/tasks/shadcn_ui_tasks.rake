namespace :shadcn_ui do
  desc "Install ShadcnUi"
  task :install do
    ShadcnUi::Installer.install
  end
end
