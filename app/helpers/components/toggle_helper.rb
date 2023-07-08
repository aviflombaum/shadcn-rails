module Components::ToggleHelper
  def render_toggle(label = nil, **options, &block)
    content = label || capture(&block)
    render "components/ui/toggle", content: content, **options
  end
end
