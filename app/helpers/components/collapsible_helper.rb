module Components::CollapsibleHelper
  def collapsible_preview(&block)
    content_for :preview, capture(&block) if block
  end

  def collapsible_body(&block)
    content_for :body, capture(&block) if block
  end

  def render_collapsible(**options, &block)
    content = capture(&block) if block
    render "components/ui/collapsible", content: content, **options
  end
end
