module Components::AlertHelper
  def render_alert(title:, description:, variant: :default, icon: true)
    alert_classes = case variant.to_sym
    when :default
      "[&>svg]:text-foreground bg-background text-foreground"
    when :error, :danger, :alert, :destructive
      "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
    else
      "border-#{variant}/50 text-#{variant} dark:border-#{variant} [&>svg]:text-#{variant}"
    end
    render "components/ui/alert", title:, description:, alert_classes:, variant:, icon:
  end
end
