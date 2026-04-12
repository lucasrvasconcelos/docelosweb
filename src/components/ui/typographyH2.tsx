import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"h2"> & {
  text?: string;
};

export function TypographyH2({ children, text, className, ...rest }: Props) {
  return (
    <h2
      {...rest}
      className={cn(
        "scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0",
        className
      )}
    >
      {children ?? text}
    </h2>
  );
}
