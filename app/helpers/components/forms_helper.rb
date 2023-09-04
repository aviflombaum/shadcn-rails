module Components::FormsHelper
  def render_form_with(**opts)
    form_with(**opts.merge(builder: Shadcn::FormBuilder)) do |form|
      yield form
    end
  end

  def render_form_for(obj, **opts)
    form_for(obj, **opts.merge(builder: Shadcn::FormBuilder), html: opts) do |form|
      yield form
    end
  end
end
