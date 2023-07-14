module Components::CheckboxHelper
  def render_checkbox(label:, name:, **options)
    render "components/ui/checkbox", name: name, label: label, options: options
  end
end
