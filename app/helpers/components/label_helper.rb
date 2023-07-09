module Components::LabelHelper
  def render_label(name:, label:, **options)
    render "components/ui/label", name: name, label: label, options: options
  end
end
