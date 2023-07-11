module Components::InputHelper
  def render_input(name:, label: false, id: nil, type: :text, value: nil, **options)
    options[:class] = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 #{options[:class]} "
    options[:class] << case options[:style]
    when :borderless
      " border-0 focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-transparent"
    else
      " focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-muted"
    end
    options.reverse_merge!(required: false, disabled: false,
      readonly: false, label: false, placeholder: "Type here...")
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
