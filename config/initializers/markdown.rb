require "redcarpet"
require "rouge"
require "rouge/plugins/redcarpet"

class HTML < Redcarpet::Render::HTML
  include Rouge::Plugins::Redcarpet # yep, that's it.
end

# config/initializers/markdown.rb

# We define a module that can parse markdown to HTML with its `call` method
module MarkdownHandler
  def self.erb
    @erb ||= ActionView::Template.registered_template_handler(:erb)
  end

  def self.call(template, source)
    compiled_source = erb.call(template, source)
    "Redcarpet::Markdown.new(Redcarpet::Render::HTML.new(with_toc_data: true), extensions = {fenced_code_blocks: true}).render(begin;#{compiled_source};end).html_safe"
  end
end

# Now we tell Rails to process any files with the `.md` extension using our new MarkdownHandler
ActionView::Template.register_template_handler :md, MarkdownHandler
