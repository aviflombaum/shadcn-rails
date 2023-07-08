module Components::PopoverHelper
  def render_popover(**options, &block)
    content = capture(&block) if block
    render "components/ui/popover", content: content, **options
  end

  def popover_trigger(&block)
    content_for :popover_trigger, capture(&block), flush: true
  end

  def popover_content(options = {}, &block)
    content_for :popover_content_class, options[:class], flush: true
    content_for :popover_content, capture(&block), flush: true
  end
end
