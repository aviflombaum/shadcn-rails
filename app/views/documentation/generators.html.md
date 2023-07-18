# Component Generators

The gem adds generators to your application to help you copy the code from this application into
yours.

Each time you run the generator it will check to make sure you have the prerequisites, like Tailwind
and the shadcn stylesheet, and if not, do its best to reconcile that for you.

After that it will copy the component files into your application. If you edit the component,
re-running the generator for it will remove your edits. **Re-running a component generator is
basically reinstalling it and overwriting any changes you might have made.**

The generator will show up in `rails g` and it is called `shadcn-ui`

## Usage

```
rails generate shadcn-ui <component_name>
```

You can list out the available components from `rails g shadcn-ui`.
