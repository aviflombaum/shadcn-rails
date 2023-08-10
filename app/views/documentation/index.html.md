# Introduction

<subtitle>Re-usable components built using Radix UI and Tailwind CSS.</subtitle>

This is **NOT** a component library. It's a collection of re-usable components that you can copy and
paste into your apps.

**What do you mean by not a component library?**

I mean you do not install it as a dependency. It is not available or distributed via npm.

Pick the components you need. Copy and paste the code into your project and customize to your needs.
The code is yours.

_Use this as a reference to build your own component libraries._

## What?

### The Application

The [repository for this library](https://github.com/aviflombaum/shadcn-rails) is both a gem and an
example repository containing this documentation. AFAIK there is no consequence in terms of bloat to
packaging and entire functional rails app within a gem, especially given the app has very few
dependencies, no database, and is generally very small. The benefit is that you can run the app
locally and see the components in action by booting up the application with `./bin/dev/` and going
to localhost. In fact, this website is running the application within the gem right now.

The benefit of this is that it gives you a working application from which to modify and copy the raw
files for each component. The end goal of the gem is to simply copy working code from this
application into your app so that you take ownership over the component and can customize it to your
needs without any unnecessary abstraction.

### The Gem

The gem provides a generator for you to use in your application to facilitate copying the code from
this application to yours. It also enforces some setup for you as the component files alone in
isolation won't always work. [Learn more about the generator](/docs/generators).
