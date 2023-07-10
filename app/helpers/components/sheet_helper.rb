module Components::SheetHelper
  def render_sheet(**options, &block)
    direction = options[:direction] || "left"
    content = capture(&block) if block
    render "components/ui/sheet", content: content, direction:, **options
  end

  def sheet_trigger(&block)
    content_for :sheet_trigger, capture(&block), flush: true
  end

  def sheet_content(&block)
    content_for :sheet_content, capture(&block), flush: true
  end
end
