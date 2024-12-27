module Components::FilterMultipleHelper
  def filter_icon(&block)
    content_for :filter_icon, capture(&block), flush: true
  end

  def render_filter_multiple(items, multiple: true, **options, &block)
    content_for :filter_icon, "", flush: true
    content = capture(&block) if block
    input_class = content_for?(:filter_icon) ? "pl-1" : ""
    render "components/ui/filter_multiple", items: items, multiple: multiple, options: options, input_class: input_class, content: content
  end
end
