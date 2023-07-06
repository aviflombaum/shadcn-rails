module Components::CollapsibleHelper
  def render_collapsible(**options, &block)
    content = capture(&block) if block
    render "components/ui/collapsible", content: content, **options
  end
end
