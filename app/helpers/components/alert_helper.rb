module Components::AlertHelper
  def render_alert(title:, description: nil, variant: :default, icon: true, &block)
    alert_classes = case variant.to_sym
    when :default
      "[&>svg]:text-foreground bg-background text-foreground"
    when :error, :danger, :alert, :destructive
      "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
    when :success
      "border-success/50 text-success dark:border-success [&>svg]:text-success"
    when :info
      "border-info/50 text-info dark:border-info [&>svg]:text-info"
    when :attention
      "border-attention/50 text-attention dark:border-attention [&>svg]:text-attention"
    end
    content = (capture(&block) if block) || description
    render "components/ui/alert", title:, content:, alert_classes:, variant:, icon:
  end
end
