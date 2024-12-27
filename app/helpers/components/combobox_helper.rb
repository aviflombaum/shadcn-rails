module Components::ComboboxHelper
  def render_combobox(id:, items: [], multiple: false, &block)
    @combobox_id = id
    content = capture(&block) if block
    render "components/ui/combobox", id: id, items:, content:, multiple: multiple
  end

  def combobox_trigger(&block)
    content_for @combobox_id, capture(&block) if block
  end
end
