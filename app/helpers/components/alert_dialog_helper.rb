module Components::AlertDialogHelper
  def render_alert_dialog(**options, &block)
    content = capture(&block) if block
    render "components/ui/alert_dialog", content: content, **options
  end

  def alert_dialog_trigger(&block)
    content_for :alert_dialog_trigger, capture(&block), flush: true
  end

  def alert_dialog_content(&block)
    content_for :alert_dialog_content, capture(&block), flush: true
  end

  def alert_dialog_continue(&block)
    content_for :alert_dialog_continue, capture(&block), flush: true
  end

  def alert_dialog_cancel(&block)
    content_for :alert_dialog_cancel, capture(&block), flush: true
  end
end
