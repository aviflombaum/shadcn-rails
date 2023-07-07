module Components::DialogHelper
  # def render_dialog(trigger:, label:, description:, continue:, **options)
  #   cancel = options[:cancel] || render_button("Cancel", class: "mt-2 sm:mt-0", data: {action: "ui--dialog#close"})
  #   render "components/ui/dialog", trigger:, label:, description:, continue:, cancel:, **options
  # end

  def render_dialog(**options, &block)
    content = capture(&block) if block
    render "components/ui/dialog", content: content, **options
  end

  def dialog_trigger(&block)
    # @_dialog_trigger = capture(&block)
    content_for :dialog_trigger, capture(&block), flush: true
  end

  def dialog_body(&block)
    content_for :dialog_body, capture(&block), flush: true
  end
end
