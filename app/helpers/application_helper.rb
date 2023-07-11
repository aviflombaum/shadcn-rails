module ApplicationHelper
  def page_title
    @page_title = ""
    if request.path.include?("/docs/components")
      component_name = params[:component].to_s.titleize
      @page_title << "#{component_name} - " if component_name.present?
    end
    @page_title << "shadcn/ui on Rails"
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
end
