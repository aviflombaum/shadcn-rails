module Components::AccordionHelper
  def render_accordion(title:, description:)
    render "components/ui/accordion", title: title, description: description
  end
end
