# Component Helpers

The main entry point to using the component is always a `render_<component>` method defined in the
helper located in `app/helpers/components/<component>_helper.rb`.

The main responsibility of the component's render method is to ultimatelly render the component's
partial, located in `app/views/components/ui/_<component>.html.erb`.

The component partial generally will integrate all the content passed to the component helper,
whether through arguments or blocks.

The render helper generally takes a hash of arguments, and a block. The arguments are used for
required values for the HTML or for the content. Blocks generally correspond to inner content or
sections for the component.

<%= code_partial("dialog/usage", :erb) %>

Here the `render_dialog` helper takes a block, and the block is used to render the `dialog_trigger`
within the corresponding DOM along with the `dialog_content` as a sibling.

Inner content is generally rendered with a `content_for` call, and the component render method will
yield to the block, capture the content, and pass it along to the main partial.

```ruby
module Components::DialogHelper
  def render_dialog(**options, &block)
    content = capture(&block) if block
    render "components/ui/dialog", content: content, **options
  end

  def dialog_trigger(&block)
    content_for :dialog_trigger, capture(&block), flush: true
  end

  def dialog_content(&block)
    content_for :dialog_content, capture(&block), flush: true
  end
end
```

That is a pretty standard example of how the components work. The component partial is responsible
for the end result HTML.

## Options

Most of the components accept a variaty of DOM/HTML/Data related options. Sometimes these are
explcitly defined in the render method, and sometimes they are globed as an `**options` argument.
This should be standardized. As much as possible, I've tried to ensure that these are correctly
accounted for and passed along to the final html/dom elements, but I imagine that is not the case
everywhere. **Would love it if you raised an issue when you find this.**

## Standardiziation

As I add more components and see edge cases, I will move to standardizing the API.
