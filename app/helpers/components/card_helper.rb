module Components::CardHelper
  def render_card(footer: nil, title: nil, subtitle: nil, body: nil, **options, &block)
    render "components/ui/card", title: title, subtitle: subtitle, footer: footer, body: (block ? capture(&block) : body), block:, **options
  end
end
