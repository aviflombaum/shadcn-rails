module Components::ListHelper
  def list_item(value:, name:, selected: false, multiple: false, as: :div)
    content_tag as, value,
      class: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm
         outline-none aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent hover:text-accent-foreground
         data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      role: multiple ? "option" : "checkbox",
      data: {value:, selected:},
      aria: {selected:}
  end

  def render_list(items, as: :div, **options)
    render "components/ui/list", items:, as:, **options
  end
end
