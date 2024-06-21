module Components::DatePickerHelper
  def render_date_picker(name:, id: nil, value: 'Pick a date', **options)
    render partial: "components/ui/date_picker", locals: {
      name:,
      value:,
      id:,
      options: options
    }
  end
end
