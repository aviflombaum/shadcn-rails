module Components::ProgressHelper
  def render_progress(value:, **options)
    render "components/ui/progress", value: (100 - value), **options
  end
end
