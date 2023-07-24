class ShadcnFormBuilder < ActionView::Helpers::FormBuilder
  def label(method, options = {})
    error_class = @object.errors[method].any? ? "error" : ""
    options[:class] = @template.tw("#{options[:class]} #{error_class}")
    @template.render_label(name: "#{object_name}[#{method}]", label: method.capitalize, **options)
  end

  def text_field(method, options = {})
    options[:class] << " error" if @object.errors[method].any?
    @template.render_input(
      name: "#{object_name}[#{method}]",
      id: "#{object_name}_#{method}",
      value: @object.send(method),
      type: "text", **options
    )
  end

  def password_field(method, options = {})
    error_class = @object.errors[method].any? ? "error" : ""
    options[:class] = @template.tw("#{options[:class]} #{error_class}")
    @template.render_input(
      name: "#{object_name}[#{method}]",
      id: "#{object_name}_#{method}",
      value: @object.send(method),
      type: "password", **options
    )
  end

  def email_field(method, options = {})
    error_class = @object.errors[method].any? ? "error" : ""
    options[:class] = @template.tw("#{options[:class]} #{error_class}")
    @template.render_input(
      name: "#{object_name}[#{method}]",
      id: "#{object_name}_#{method}",
      value: @object.send(method),
      type: "email", **options
    )
  end

  def submit(value = nil, options = {})
    @template.render_button(value, **options)
  end
end
