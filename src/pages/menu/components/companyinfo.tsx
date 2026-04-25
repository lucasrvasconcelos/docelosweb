import { MapPinCheck, MessageSquareMore } from "lucide-react";
import { Link } from "react-router";
import { TypographyH1 } from "@/components/ui/typographyH1";
import { TypographyH4 } from "@/components/ui/typographyH4";

export function CompanyInfo() {
  return (
    <div className="-mt-6 flex w-full flex-col items-center rounded-2xl bg-card px-3 pb-3 shadow-sm sm:hidden">
      <div className="flex flex-col items-center justify-center">
        <div className="-mt-11 rounded-full bg-white p-1.5">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-linear-to-t from-white to-header shadow">
            <img
              alt="Logo tempero vasconcelos"
              src="https://storage.googleapis.com/prod-cardapio-web/uploads/company/logo/21276/6b6e86e0logo.jpeg"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <TypographyH1
            className="mb-2 px-6 font-semibold text-foreground text-xl leading-6.5"
            text={"Docelos | by debora"}
          />
          <div className="flex items-center justify-center gap-4 text-muted-foreground text-xs">
            <div className="flex items-center justify-center gap-0.5">
              <MapPinCheck className="text-primary" size={13} />
              <span>Fortaleza - CE</span>
            </div>
            <div className="flex items-center justify-center gap-0.5">
              <MessageSquareMore
                className="text-primary dark:text-primary-foreground"
                size={13}
              />
              <Link
                className="font-bold text-primary dark:text-primary-foreground"
                to={"/"}
              >
                Mais informações
              </Link>
            </div>
          </div>
          <TypographyH4 className="mt-3 font-bold text-green-500 text-xs">
            Aberto Agora - Até 23:00
          </TypographyH4>
        </div>
      </div>
    </div>
  );
}
