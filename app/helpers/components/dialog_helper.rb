module Components::DialogHelper
  def render_dialog(**options, &block)
    content = capture(&block) if block
    options[:state] = options[:state] || "closed"
    render "components/ui/dialog", content: content, options: options
  end

  def dialog_trigger(**options, &block)
    content_for :dialog_trigger, capture(&block), options: options, flush: true
  end

  def dialog_content(&block)
    content_for :dialog_content, capture(&block), flush: true
  end
end
