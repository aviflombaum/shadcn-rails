module Components::CheckboxHelper
  def render_checkbox(label:, name:)
    render "components/ui/checkbox", name: name, label: label
  end
end
