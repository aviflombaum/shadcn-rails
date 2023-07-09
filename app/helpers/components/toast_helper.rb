module Components::ToastHelper
  def render_toast(header: nil, description: nil, action: nil, class: nil, data: nil, **options, &block)
    render "components/ui/toast", header:, description:, action:, class:, data:, options: options
  end
end
