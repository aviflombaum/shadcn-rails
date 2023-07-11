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
end
