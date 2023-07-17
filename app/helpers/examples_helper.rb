module ExamplesHelper
  def render_component_header(title:, description:)
    render "layouts/documentation/component_header", title:, description:
  end

  def render_example
    render "layouts/documentation/examples"
  end

  def render_preview
    render "layouts/documentation/preview"
  end

  def render_usage(name)
    render "examples/components/#{name}/usage"
  end

  def render_code_preview(name)
    render "examples/components/#{name}/code/preview"
  end

  def code_partial(name, language)
    component, partial = name.split("/")
    content_tag :pre, class: "code-sample py-4 px-4", data: {controller: "highlight"} do
      content_tag :code, class: "language-#{language}" do
        html_escape(File.read(Rails.root.join("app", "views", "examples", "components", "#{component}/code/_#{partial}.erb")))
      end
    end
  end

  def code_sample(content = "", language:, &block)
    content_tag :pre, class: "code-sample px-4 my-2 pb-5 min-h-fit", data: {controller: "highlight"} do
      content_tag :code, class: "language-#{language}" do
        yield if block
      end
    end
  end

  def inline_code(content = nil, &block)
    content_tag :code, class: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold" do
      content || yield(block)
    end
  end
  alias_method :code, :inline_code
end
