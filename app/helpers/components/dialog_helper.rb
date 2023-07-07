module Components::DialogHelper
  def render_dialog(**options, &block)
    content = capture(&block) if block
    render "components/ui/dialog", content: content, **options
  end

  def dialog_trigger(&block)
    content_for :dialog_trigger, capture(&block), flush: true
  end

  def dialog_body(&block)
    content_for :dialog_body, capture(&block), flush: true
  end
end
