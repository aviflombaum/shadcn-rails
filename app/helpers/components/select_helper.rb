module Components::SelectHelper
  def render_select(name:, **options, &block)
    component = Shadcn::SelectComponent.new(name: name, view_context: self, **options, &block)
    component.call
  end
end
