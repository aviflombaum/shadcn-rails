module Components::CardHelper
  def render_card(title: nil, subtitle: nil, body: nil, footer: nil, **options, &block)
    render "components/ui/card", title: title, subtitle: subtitle, footer: footer, body: (block ? capture(&block) : body), block:, options: options
  end
end
