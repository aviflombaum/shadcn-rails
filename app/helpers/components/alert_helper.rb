module Components::AlertHelper
  def render_alert(title:, description:, variant: :default)
    alert_classes = case variant.to_sym
    when :default
      "[&>svg]:text-foreground bg-background text-foreground"
    when :error, :danger, :alert, :destructive
      "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
    else
      "border-#{variant}/50 text-#{variant} dark:border-#{variant} [&>svg]:text-#{variant}"
    end
    render "components/ui/alert", title: title, description: description, alert_classes: alert_classes, variant: variant
  end
end
