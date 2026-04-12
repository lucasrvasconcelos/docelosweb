import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"h4"> & {
  text?: string;
};

export function TypographyH4({ children, className, text, ...rest }: Props) {
  return (
    <h4
      {...rest}
      className={cn(
        "scroll-m-20 font-semibold text-xl tracking-tight",
        className
      )}
    >
      {children ?? text}
    </h4>
  );
}
