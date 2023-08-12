require "tailwind_merge"

module ComponentsHelper
  def tw(*classes)
    TailwindMerge::Merger.new.merge(classes.join(" "))
  end

  PRIMARY_CLASSES = " bg-primary text-primary-foreground hover:bg-primary/80 "
  SECONDARY_CLASSES = " bg-secondary text-secondary-foreground hover:bg-secondary/80 "
  OUTLINE_CLASSES = "  border border-input bg-background hover:bg-accent hover:text-accent-foreground "
  GHOST_CLASSES = " hover:bg-accent hover:text-accent-foreground  "
  DESTRUCTIVE_CLASSES = " bg-destructive text-destructive-foreground hover:bg-destructive/90 "

  module Button
    PRIMARY = ComponentsHelper::PRIMARY_CLASSES
    SECONDARY = ComponentsHelper::SECONDARY_CLASSES
    OUTLINE = ComponentsHelper::OUTLINE_CLASSES
    GHOST = ComponentsHelper::GHOST_CLASSES
    DESTRUCTIVE = ComponentsHelper::DESTRUCTIVE_CLASSES
  end

  module Alert
  end
end
