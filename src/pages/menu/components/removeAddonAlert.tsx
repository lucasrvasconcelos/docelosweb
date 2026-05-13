import { Trash2, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface RemoveAddonAlertProps {
  addonName: string;
  onDecrement: () => void;
}

export function RemoveAddonAlert({
  onDecrement,
  addonName,
}: RemoveAddonAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="cursor-pointer border-none bg-transparent p-0 text-primary text-xl disabled:opacity-50"
          variant="outline"
        >
          <Trash2 size={18} />{" "}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="gap-0">
        <AlertDialogHeader className="rounded-xs font-medium text-sm">
          <AlertDialogTitle className="font-bold text-sm">
            Deseja relmente excluir?
          </AlertDialogTitle>
          <div className="flex items-center justify-center gap-2 px-4 py-2">
            <X
              className="shrink-0 rounded-full bg-red-500 p-0.5 text-red-100"
              size={15}
              strokeWidth={4}
            />
            <span className="line-clamp-3 whitespace-normal text-red-500">
              {addonName}
            </span>
          </div>
          <AlertDialogDescription className="sr-only">
            Exclusão de complemento
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Não</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDecrement()}>
            Sim
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
