module Components::SheetHelper
  def render_sheet(**options, &block)
    options[:direction] ||= "left"
    options[:width] ||= "w-3/4"
    options[:state] ||= "closed"

    content_for :sheet_trigger, "", flush: true
    content_for :sheet_content, "", flush: true

    content = capture(&block) if block
    render "components/ui/sheet", content: content, options: options
  end

  def sheet_trigger(&block)
    content_for :sheet_trigger, capture(&block), flush: true
  end

  def sheet_content(&block)
    content_for :sheet_content, capture(&block), flush: true
  end

  def direction_class(direction)
    mappings = {
      left: "left-0",
      right: "right-0"
    }

    mappings[direction.to_sym]
  end
end
