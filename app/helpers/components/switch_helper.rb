module Components::SwitchHelper
  def render_switch(text, id:, name:, state: "unchecked", **options)
    render "components/ui/switch", text:, id:, name:, state:, options:
  end
end
