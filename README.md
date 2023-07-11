# shadcn/ui on Rails

[![Gem Version](https://badge.fury.io/rb/shadcn-ui.svg)](https://badge.fury.io/rb/shadcn-ui)

Accessible and customizable components that you can copy and paste into your apps. Free. Open
Source. **Use this to build your own component library**.

## About

This is **NOT** a component library. It's a collection of re-usable components that you can copy and
paste into your apps.

**What do you mean by not a component library?**

I mean you do not install it as a dependency. It is not available or distributed via npm.

Pick the components you need. Copy and paste the code into your project and customize to your needs.
The code is yours.

Use this as a reference to build your own component libraries.

![hero](public/og.jpg)

## Alpha Usage/Installation

Prior to the initial gem release, you can use this as an alpha by cloning this repository and
starting up the app as you would a standard rails app.

```
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

If you haven't already, install Tailwind into your rails application by adding `tailwindcss-rails`
to your `Gemfile` and install tailwind into your app:

```sh
./bin/bundle add tailwindcss-rails
./bin/rails tailwindcss:install
```

Then install ./bin/rails tailwindcss:install

### Configure tailwind.config.js

Here's what my `tailwind.config.js` file looks like:

```js title="tailwind.config.js"
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./public/*.html",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/views/**/*.{erb,haml,html,slim}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animate"),
  ],
};
```

### Configure styles

Add the following to your app/assets/stylesheets/application.tailwind.css file.

```css title="application.tailwind.css"
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;

    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;

    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;

    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;

    --border: 216 34% 17%;
    --input: 216 34% 17%;

    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;

    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --ring: 216 34% 17%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings:
      "rlig" 1,
      "calt" 1;
  }
}
```

### Copy a a component's files to your application

For example, if you want to use the Accordion component, you would copy the following files to your
application:

- `app/javascript/controllers/components/ui/accordion_controller.js` The Stimulus controller for any
  component that requires javascript.
- `app/helpers/components/accordion_helper.rb` The helper for the component that allows for easy
  rendering within views.
- `app/views/components/ui/_accordion.html.erb` The html for the component.

Once those are copied in your application you can render an accordion with:

```erb
<%= render_accordion title: "Did you know?", description: "You can wrap shadcn helpers in any
  component library you want!" %>
<%= render_accordion title: "Use the generators.", description: "Add components with #{code("rails g shadcn_ui add accordion")}".html_safe %>
```

See the component's demo page in `app/views/examples/components/accordion.html.erb` for more
examples.

This will be similar for each component.

## Documentation

Visit https://avi.nyc/shadcn-on-rails to view the documentation.

## Contributing

I am desperately seeking contributors to this project as it is in the very early stages.

### Contributing with Issues

I am looking for people to start documenting issues in the project. The issues I'm interested in
are:

1. What components are missing? Just start listing out the components that have yet to be
   implemented, better yet, open a PR with a branch for that issue and we can all start adding to
   it.
2. What components are not accessible? I am not an accessibility expert, so I need help with this.
   If you see something that is not accessible, please open an issue and let me know. This might
   mean the aria labels are hardcoded and not customizable or that the labels are simply missing.
3. What components are not customizable? I am trying to make all components as customizable as
   possible. If you see something that is not customizable, please open an issue and let me know.
   All the attributes of a component, like aria labels or classes or id or name, etc, should be
   customizeable by passing attributes into their helper functions that are passed down to the
   component's partial to be rendered.
4. Suggestions for the API of the components. I am trying to make the API as simple as possible. If
   you have any suggestions for how to make the API simpler, please open an issue and let me know. I
   am open to any and all suggestions.

These are 3 main areas that would make the project easier for people to contribute to. They all make
for great opportunities for someone new to open source to both file the issue and even begin to
slowly implement them.

### Setup

1. Fork and clone the repo.
2. Run `bundle install` to install dependencies, there aren't many as this is currently a standard
   Rails applications.
3. `/bin/dev` to start the application.

### App Structure

For now this is a standard Rails 7 application using propshaft and **importmaps**. This will soon be
extracted into a gem that provides the components to be installed (copied) into the including
application.

### Components

The goal of this project is to provide a set of components that can be copied into your application.
The components are built using [TailwindCSS](https://tailwindcss.com/) and
[Stimulus](https://stimulus.hotwire.dev/). Each component follows the same structure:

1. There is a component partial located in `app/views/components/ui` that is rendered by the
   component helper. Ex `app/views/components/ui/_button.html.erb` provides the markup for the
   button component.
2. There is a component helper named after the component that is responsible for rendering the
   component and taking in arguments to customize the component located in `app/helpers/components`.
   Ex `app/helpers/components/button.rb` provides the `render_button` helper that accepts arguments
   such as `variant` which describes the kind of button and passes the classes for that `variant` to
   the partial.
3. When needed there is a stimulus controller for the component that provides the javascript
   required to make the component interactive. Ex. `app/javascript/controllers/toast_controller.js`
   provides the javascript for the toast component to display it and then hide it after a certain
   amount of time.

This demo application also included examples of how to use the components in
`app/views/examples/components`. This is used to create the documentation site that this application
provides with examples of teh components rendered.

For now, this convention should be followed when developing new components.

## [shadcn-ui](https://ui.shadcn.com)

These components are based on the components provided by [shadcn/ui](https://ui.shadcn.com). Because
`shadcn-ui` is so heavily reliant on Radix and React, these components are most likely not going to
be 1:1 copies of the components provided by `shadcn-ui`. However, the goal is to provide the same
components with the same API and the same accessibility features. If you are looking for a React
component library, I highly recommend checking out [shadcn/ui](https://ui.shadcn.com).

## License

Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).
