module Components::AlertHelper
  def render_alert(title:, description:, type: :default)
    alert_classes = case type.to_sym
    when :default
      "[&>svg]:text-foreground bg-background text-foreground"
    when :error, :danger, :alert, :destructive
      "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
    end
    render "components/ui/alert", title: title, description: description, alert_classes: alert_classes, type: type
  end
end
