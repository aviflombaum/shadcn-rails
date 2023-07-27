module Components::ComboboxHelper
  def render_combobox(items, &block)
    content = capture(&block) if block
    render "components/ui/combobox", items:, content:
  end

  def combobox_trigger(&block)
    content_for :trigger, capture(&block) if block
  end
end
