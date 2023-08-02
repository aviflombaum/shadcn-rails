module Components::SliderHelper
  def render_slider(name:, value: 0, id: nil, **options)
    render "components/ui/slider", value:, id:, name:, options:
  end
end
