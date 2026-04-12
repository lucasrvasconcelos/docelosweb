import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"h3"> & {
  text?: string;
};

export function TypographyH3({ children, text, className, ...rest }: Props) {
  return (
    <h3
      {...rest}
      className={cn(
        "scroll-m-20 font-semibold text-2xl tracking-tight",
        className
      )}
    >
      {children ?? text}
    </h3>
  );
}
