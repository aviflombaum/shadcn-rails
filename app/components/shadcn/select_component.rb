class Shadcn::SelectComponent
  include ComponentsHelper
  attr_reader :name, :selected, :view_context

  def initialize(name:, view_context:, selected: nil, **options, &block)
    @name = name
    @view_context = view_context
    @selected = selected
    @options = options
    @content = view_context.capture(self, &block) if block
  end

  def option(value:, label: nil, &block)
    content = label || view_context.capture(&block)
    option_options = {value: value}
    option_options[:selected] = "selected" if value == selected
    view_context.content_tag :option, content, option_options
  end

  def call
    view_context.content_tag :select, @content, name: name, class: tw("rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", @options[:class])
  end
end
