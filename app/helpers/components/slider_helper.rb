module Components::SliderHelper
  def render_slider(value:, id:, name:, **options)
    render "components/ui/slider", value:, id:, name:, **options
  end
end
