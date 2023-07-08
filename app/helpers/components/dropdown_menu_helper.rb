module Components::DropdownMenuHelper
  def render_dropdown_menu(**options, &block)
    content = capture(&block) if block
    render "components/ui/dropdown_menu", content: content, **options
  end

  def dropdown_menu_trigger(&block)
    content_for :dropdown_menu_trigger, capture(&block), flush: true
  end

  def dropdown_menu_label(label = nil, &block)
    content_for :dropdown_menu_label, (label || capture(&block)), flush: true
  end

  def dropdown_menu_content(&block)
    content_for :dropdown_menu_content, capture(&block), flush: true
  end

  def dropdown_menu_item(label = nil, **options, &block)
    content = (label || capture(&block))
    render "components/ui/shared/menu_item", content: content
  end
end
