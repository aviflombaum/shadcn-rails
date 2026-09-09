# Installation

The more automated way to install the components into your application is via the gem packaged
within this application. The gem provides generators that will setup your applications as best as
possible without potentially overwriting any existing code as well as copy components and their
dependencies to your application.

## Add the Gem

First step is adding the gem to your gemfile.

```sh
bundle add shadcn-ui
bundle install
```

## Install and Setup Dependencies

### TailwindCSS v4

The components require Tailwind CSS v4 and the `tailwindcss-rails` gem v4+.

1. Tailwind CSS must be installed in your application. If it's not already, add `tailwindcss-rails`
   (`~> 4.0`) to your Gemfile and run its installer:

```sh
./bin/bundle add tailwindcss-rails
./bin/rails tailwindcss:install
```

2. One npm package is needed for component animations. Create a `package.json` if you don't have
   one via `echo '{}' >> package.json`, then install:

```
npm install tw-animate-css
```

**Note:** Tailwind v4 has many old v3 plugins built-in (forms, typography, aspect-ratio,
container-queries). You no longer need to install them separately.

### shadcn CSS - Required

#### shadcn.css

The generator will automatically copy `app/assets/stylesheets/shadcn.css` to your application.
This file contains all the CSS variables (using OKLCH color space), the `@theme inline` block
that exposes them to Tailwind, and base styles.

You need to make sure `shadcn.css` is imported in your `app/assets/tailwind/application.css`
file. The generator should handle this automatically, but double check that your file looks
like this:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "../stylesheets/shadcn.css";
```

**Note:** Tailwind v4 uses a CSS-first configuration approach. There is no `tailwind.config.js`
or `shadcn.tailwind.js` file needed. All theme configuration is handled via `@theme inline`
inside `shadcn.css`.

## End

That's it! You are now set to start
[installing components via the generator](/docs/generators) and rendering them into your
views.

# Manual Installation

Prior to the initial gem release, you can use this as an alpha by cloning this repository and
starting up the app as you would a standard rails app.

```sh
git clone https://github.com/aviflombaum/shadcn-rails.git
cd shadcn-rails
bundle install
./bin/dev
```

There are very few dependencies and no database so it should just boot up. Visit
http://localhost:3000 to see the demo app which is also the documentation. You'll be able to browse
the components at http://localhost:3000/components.

If there's a component you want to try in your app, you will be copying the code from this app to
yours. There's a few other steps you'll need.

## Installing a Component

### Add Tailwind CSS

Components are styled using Tailwind CSS. You need to install Tailwind CSS in your project.

[Follow the Tailwind CSS installation instructions to get started.](https://tailwindcss.com/docs/installation)

### Add dependencies

If you haven't already, install Tailwind v4 into your rails application:

```sh
./bin/bundle add tailwindcss-rails
./bin/rails tailwindcss:install
npm install tw-animate-css
```

### Configure styles

Tailwind v4 uses a CSS-first configuration approach. There is no `tailwind.config.js` needed.

Copy `shadcn.css` from this repo to `app/assets/stylesheets/shadcn.css` in your application.
This file contains CSS variables (OKLCH colors), the `@theme inline` block, and base styles.

Then ensure your `app/assets/tailwind/application.css` imports it:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "../stylesheets/shadcn.css";
```

### Copy Component Files

For example, if you want to use the Accordion component, you would copy the following files to your
application:

- `app/javascript/controllers/components/ui/accordion_controller.js` The Stimulus controller for any
  component that requires javascript.
- `app/helpers/components/accordion_helper.rb` The helper for the component that allows for easy
  rendering within views.
- `app/views/components/ui/_accordion.html.erb` The html for the component.

Once those are copied in your application you can render an accordion with:

```
<%%= render_accordion title: "Did you know?",
                      description: "You can wrap shadcn helpers in any
                                    component library you want!" %>
```

Result:

<img src="/accordion.png" alt="Example of Accordion" />

See the component's demo page in `app/views/examples/components/accordion.html.erb` for more
examples.

This will be similar for each component.

# Conclusion

You can freely mix and match both styles as your application evolves. The end goal of each of them
is to get the component code into your application so you can further customize and take ownership
of your design system.
