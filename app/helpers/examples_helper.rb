module ExamplesHelper
  def render_component_header(title:, description:)
    render "layouts/documentation/component_header", title:, description:
  end

  def render_example
    render "layouts/documentation/examples"
  end

  def code_sample(name, language)
    content_tag :pre, class: "code-sample", data: {controller: "highlight"} do
      content_tag :code, class: "language-#{language}" do
        html_escape(File.read(Rails.root.join("app", "views", "examples", "components", "code", "#{name}.erb")))
      end
    end
  end
end
