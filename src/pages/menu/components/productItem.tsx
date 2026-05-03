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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH4 } from "@/components/ui/typographyH4";
import { formatCurrecy } from "@/lib/format-currency";
import { AddonsGroup } from "./addonsGroup";
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
  const MIN_QUANTITY = 1;
  const MAX_QUANTITY = 5;

  function updateQuantity(delta: number) {
    setQuantity((state) => {
      const newValue = state + delta;
      return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, newValue));
    });
  }

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
      <DialogContent
        className="h-full max-w-none rounded-none p-0"
        showCloseButton={false}
      >
        <div className="h-screen overflow-y-auto pb-20">
          <img
            alt={item.name}
            className="aspect-16/11 object-cover transition-opacity duration-300"
            src={item.imageUrl}
          />

          <div className="sticky top-0 z-50 mt-2 bg-white px-5 pt-2 pb-4">
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
          </div>

          <div className="px-5">
            {item.description && (
              <DialogDescription className="line-clamp-5 text-xs italic">
                {item.description}
              </DialogDescription>
            )}
          </div>
          {item.addonsGroup && <AddonsGroup addonsGroup={item.addonsGroup} />}

          <div className="relative mt-8 mb-2 px-4">
            <Textarea
              className={"wrap-anywhere min-h-25 text-xs"}
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
        </div>
        <DialogClose asChild>
          <Button
            className="absolute top-3 right-2 h-10 w-10 cursor-pointer rounded-md bg-white/70"
            type="button"
          >
            <X className="text-gray-700" />
          </Button>
        </DialogClose>

        <DialogFooter className="fixed bottom-0 flex w-full flex-row items-center justify-center gap-3 bg-white px-3 py-4">
          <div className="flex items-center space-x-4 rounded-md bg-gray-100 p-3 text-sm">
            <button
              className="cursor-pointer p-0 text-gray-700 text-xl disabled:opacity-50"
              disabled={quantity <= MIN_QUANTITY}
              onClick={() => updateQuantity(-1)}
              type="button"
            >
              <Minus size={16} />
            </button>
            <span className="w-4 text-center font-normal text-gray-700 text-sx">
              {quantity}
            </span>

            <button
              className={
                "cursor-pointer p-0 text-gray-700 text-xl disabled:opacity-50"
              }
              disabled={quantity >= MAX_QUANTITY}
              onClick={() => updateQuantity(1)}
              type="button"
            >
              <Plus size={16} />
            </button>
          </div>
          <Button
            className="relative flex-1 cursor-pointer gap-8 rounded-md py-5"
            type="button"
            variant={"default"}
          >
            <span className="w-full text-left">Adicionar</span>
            <span className="absolute top-2.5 right-3 items-center whitespace-nowrap font-medium">
              {formatCurrecy(productPrice)}
            </span>
            {item.originalPrice && discountProduct > 0 && (
              <span className="absolute -top-3.5 right-2 items-center whitespace-nowrap font-medium text-[10px] text-green-600">
                Economizou {formatCurrecy(discountProduct)}
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
