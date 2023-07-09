module Components::InputHelper
  def render_input(name:, label: false, id: nil, type: :text, value: nil, **options)
    options.reverse_merge!(required: false, disabled: false,
      readonly: false, class: "", label: false, placeholder: "Type here...")
    render partial: "components/ui/input", locals: {
      type:,
      label:,
      name:,
      value:,
      id:,
      options: options
    }
  end
end
