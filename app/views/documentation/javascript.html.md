# Stimulus Controllers

Many components are paired with a stimulus controller that lives in
`app/javascript/controllers/ui/<component>_controller.js`. As much as possible I try to avoid adding
depedencies and currently this application is managing them with importmaps and I'm pretty sure if
you're not using importmaps, this breaks.

The Stimulus controllers frankly need a lot of work.
