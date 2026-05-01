import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import type { ItemsType } from "@/api/products/categories";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH4 } from "@/components/ui/typographyH4";
import { formatCurrecy } from "@/lib/format-currency";
import { SpanTag } from "./tagsProduct";

interface ProductItemProps {
  item: ItemsType;
}

export function ProductItem({ item }: ProductItemProps) {
  const [quantity, setQuantity] = useState(1);
  const productPrice = quantity * item.price;
  const discountProduct = item.originalPrice
    ? (item.originalPrice - item.price) * quantity
    : 0;

  const [textArea, setTextArea] = useState("");
  const MAX_SIZE_TEXTAREA = 110;

  return (
    <Dialog>
      <DialogTrigger
        className="relative flex h-full min-h-28 w-full cursor-pointer flex-row items-start justify-between gap-6 rounded-md border bg-card p-2 sm:p-2"
        key={item.id}
      >
        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1 text-xs">
              {item.tags?.map((tag) => (
                <SpanTag key={tag} variant={tag}>
                  {tag}
                </SpanTag>
              ))}
            </div>

            <TypographyH4 className="line-clamp-2 text-left font-semibold text-base text-gray-700 leading-6">
              {item.name}
            </TypographyH4>
            {item.description && (
              <p className="line-clamp-2 text-left font-light text-gray-500 text-sm">
                {item.description}
              </p>
            )}
          </div>

          <div className="mt-2 flex gap-2 text-base">
            <span className="font-semibold text-green-500">
              {formatCurrecy(item.price)}
            </span>
            {item.originalPrice && (
              <span className="text-gray-500 text-sm line-through">
                {formatCurrecy(item.originalPrice)}
              </span>
            )}
          </div>
        </div>
        <div className="flex h-28 w-28 overflow-hidden rounded-lg p-0 sm:h-30 sm:w-30 lg:h-32 lg:w-32">
          <img alt={item.name} className="h-full w-full" src={item.imageUrl} />
        </div>
      </DialogTrigger>
      <DialogContent className="rounded-t-4xl p-0" showCloseButton={false}>
        <ScrollArea className="h-96">
          <DialogHeader className="rounded-t-4xl bg-white">
            <img
              alt={item.name}
              className="aspect-16/11 rounded-t-4xl object-cover transition-opacity duration-300"
              src={item.imageUrl}
            />

            <div className="mt-2 px-5">
              <div className="mt-1 mb-3 -ml-1 flex flex-wrap gap-1 text-xs">
                {item.tags?.map((tag) => (
                  <SpanTag key={tag} variant={tag}>
                    {tag}
                  </SpanTag>
                ))}
              </div>
              <DialogTitle className="mt-2 line-clamp-1 font-bold">
                {item.name}
              </DialogTitle>

              {item.description && (
                <DialogDescription className="mt-2 line-clamp-5">
                  {item.description}
                </DialogDescription>
              )}
            </div>
          </DialogHeader>
          {item.addonsGroup && (
            <div className="mt-8 flex flex-col px-5">
              <div className="flex flex-col gap-3">
                {item.addonsGroup.map((addonGroup) => {
                  return (
                    <div className="flex flex-col" key={addonGroup.id}>
                      <span className="font-medium text-sm">
                        {addonGroup.name}
                      </span>
                      <span>
                        {" "}
                        escolha até {addonGroup.maxSelect}{" "}
                        {addonGroup.maxSelect && addonGroup.maxSelect > 1
                          ? "opções"
                          : "opção"}
                      </span>
                      {addonGroup.addons.map((addon) => {
                        return <span key={addon.id}>{addon.name}</span>;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="relative mt-1 px-4">
            <Textarea
              className={"wrap-anywhere h-6 text-xs"}
              id="observation"
              onChange={(e) =>
                setTextArea((state) => {
                  if (e.target.value.length - 1 >= MAX_SIZE_TEXTAREA) {
                    return state;
                  }
                  return e.target.value;
                })
              }
              placeholder="Alguma observação?"
              value={textArea}
            />
            <span className="absolute -top-4 right-6 font-semibold text-[10px] text-gray-500">{`${textArea.length} / ${MAX_SIZE_TEXTAREA}`}</span>
          </div>
          <DialogClose asChild>
            <Button
              className="absolute top-3 right-2 h-10 w-10 cursor-pointer rounded-md bg-white/70"
              type="button"
            >
              <X className="text-gray-700" />
            </Button>
          </DialogClose>
        </ScrollArea>

        <DialogFooter className="flex flex-row items-center justify-center gap-3 px-3 pb-4">
          <div className="flex items-center space-x-4 rounded-md bg-gray-100 p-3 text-sm">
            <button
              className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall cursor-pointer p-0 text-gray-700 text-xl"
              onClick={() => {
                setQuantity((state) => {
                  if (state <= 1) {
                    return state;
                  }
                  return state - 1;
                });
              }}
              type="button"
            >
              <Minus size={14} />
            </button>
            <span className="min-w-4 text-center font-normal text-gray-700 text-sx">
              {quantity}
            </span>

            <button
              className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall cursor-pointer p-0 text-gray-700 text-xl"
              onClick={() => {
                setQuantity((state) => {
                  if (state >= 99) {
                    return state;
                  }
                  return state + 1;
                });
              }}
              type="button"
            >
              <Plus size={14} />
            </button>
          </div>
          <Button
            className="relative flex-1 cursor-pointer gap-8 rounded-md py-5"
            type="button"
            variant={"default"}
          >
            <span>Adicionar</span>
            <span>{formatCurrecy(productPrice)}</span>
            {item.originalPrice && discountProduct > 0 && (
              <span className="absolute -top-4 right-2 items-center whitespace-nowrap font-medium text-[10px] text-green-600">
                Economizou {formatCurrecy(discountProduct)}
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
