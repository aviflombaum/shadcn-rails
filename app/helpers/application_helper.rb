module ApplicationHelper
  def page_title
    @page_title = ""
    if request.path.include?("/docs/components")
      component_name = params[:component].to_s.titleize
      @page_title << "#{component_name} - " if component_name.present?
    end
    @page_title << "shadcn/ui on Rails"

    set_meta_tags(
      title: @page_title
    )

    @page_title
  end

  def sidebar_link(text, path)
    classes = "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"
    classes << if request.path == path
      " text-foreground font-bold"
    else
      " text-muted-foreground"
    end
    link_to text, path, class: classes
  end

  def generate_sidebar_content(html_content)
    doc = Nokogiri::HTML.fragment(html_content)

    doc.css('div.preview h2, div.preview h3').remove

    items = []
    current_h2 = nil

    doc.css('h2, h3').each do |header|
      item = {
        tag: header.name,
        text: header.text,
        anchor: header['id'] || header.text.parameterize
      }

      if header.name == "h2"
        current_h2 = item
        items << current_h2
        current_h2[:subitems] = []
      elsif current_h2 && header.name == "h3"
        current_h2[:subitems] << item
      end
    end

    items
  end

end
