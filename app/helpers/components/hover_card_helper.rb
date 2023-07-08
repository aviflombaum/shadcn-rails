module Components::HoverCardHelper
  def render_hover_card(**options, &block)
    content = capture(&block) if block
    render "components/ui/hover_card", content: content, **options
  end

  def hover_card_trigger(&block)
    content_for :hover_card_trigger, capture(&block), flush: true
  end

  def hover_card_content(options = {}, &block)
    content_for :hover_card_content_class, options[:class], flush: true
    content_for :hover_card_content, capture(&block), flush: true
  end
end
