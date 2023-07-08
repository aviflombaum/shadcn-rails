module Components::TooltipHelper
  def render_tooltip(**options, &block)
    content = capture(&block) if block
    render "components/ui/tooltip", content: content, **options
  end

  def tooltip_trigger(&block)
    content_for :tooltip_trigger, capture(&block), flush: true
  end

  def tooltip_content(options = {}, &block)
    content_for :tooltip_content_class, options[:class], flush: true
    content_for :tooltip_content, capture(&block), flush: true
  end
end
