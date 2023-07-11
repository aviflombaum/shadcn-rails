# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "ui/popover", to: "controllers/ui/popover_controller", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "https://ga.jspm.io/npm:@hotwired/stimulus@3.2.1/dist/stimulus.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "@kanety/stimulus-static-actions", to: "https://ga.jspm.io/npm:@kanety/stimulus-static-actions@1.0.1/dist/index.modern.js", preload: true
pin "highlight.js", to: "https://ga.jspm.io/npm:highlight.js@11.8.0/es/index.js", preload: true
pin "stimulus-use", to: "https://ga.jspm.io/npm:stimulus-use@0.51.3/dist/index.js", preload: true
pin "stimulus-dropdown", to: "https://ga.jspm.io/npm:stimulus-dropdown@2.1.0/dist/stimulus-dropdown.mjs", preload: true
pin "hotkeys-js", to: "https://ga.jspm.io/npm:hotkeys-js@3.10.4/dist/hotkeys.esm.js", preload: true
pin "@popperjs/core", to: "https://ga.jspm.io/npm:@popperjs/core@2.11.8/lib/index.js", preload: true
