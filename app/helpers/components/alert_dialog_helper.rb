module Components::AlertDialogHelper
  def render_alert_dialog(trigger:, label:, description:, continue:, **options)
    cancel = options[:cancel] || render_button("Cancel", class: "mt-2 sm:mt-0", data: {action: "ui--dialog#close"})
    render "components/ui/alert_dialog", trigger:, label:, description:, continue:, cancel:, **options
  end
end
