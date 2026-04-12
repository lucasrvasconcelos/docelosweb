import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"h1"> & {
  text?: string;
};

export function TypographyH1({ children, text, className, ...rest }: Props) {
  return (
    <h1
      {...rest}
      className={cn(
        "scroll-m-20 text-balance text-center font-extrabold text-4xl tracking-tight",
        className
      )}
    >
      {children ?? text}
    </h1>
  );
}
