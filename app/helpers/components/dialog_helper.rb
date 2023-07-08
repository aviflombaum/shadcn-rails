module Components::DialogHelper
  def render_dialog(**options, &block)
    content = capture(&block) if block
    render "components/ui/dialog", content: content, **options
  end

  def dialog_trigger(&block)
    content_for :dialog_trigger, capture(&block), flush: true
  end

  def dialog_content(&block)
    content_for :dialog_content, capture(&block), flush: true
  end
end
