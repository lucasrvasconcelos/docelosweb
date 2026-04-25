import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

export const TAG_CONFIG = {
  default: {
    label: "",
    className: "",
  },
  best_seller: {
    label: "🔥 Mais pedido",
    className: "bg-red-100 text-red-600",
  },
  recommended: {
    label: "⭐ Recomendado",
    className: "bg-yellow-100 text-yellow-600",
  },
  new: {
    label: "🆕 Novo",
    className: "bg-green-100 text-green-600",
  },
  exclusive: {
    label: "👑 Exclusivo",
    className: "bg-purple-100 text-purple-600",
  },
  promotion: {
    label: "💸 Promoção",
    className: "bg-blue-100 text-blue-600",
  },
} as const;

export type TagType = keyof typeof TAG_CONFIG & string;

const tagVariants = Object.fromEntries(
  Object.entries(TAG_CONFIG).map(([key, value]) => [key, value.className])
) as Record<TagType, string>;

const productTagsVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-sm bg-yellow-100 bg-opacity-70 px-2.5 py-1 font-medium text-[10px]",
  {
    variants: {
      variant: tagVariants,
    },
    defaultVariants: {
      variant: "exclusive",
    },
  }
);

type ProductTagsProps = React.ComponentProps<"span"> &
  VariantProps<typeof productTagsVariants> & {
    asChild?: boolean;
  };

function SpanTag({
  className,
  variant = "best_seller",
  asChild = false,
  ...props
}: ProductTagsProps) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      className={cn(productTagsVariants({ variant }), className)}
      data-slot="span"
      data-variant={variant}
      {...props}
    >
      {variant && TAG_CONFIG[variant].label}
    </Comp>
  );
}

export { type productTagsVariants, SpanTag };
