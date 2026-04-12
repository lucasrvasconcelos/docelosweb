import { MapPinCheck, MessageSquareMore } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typographyH1";
import { TypographyH4 } from "@/components/ui/typographyH4";

export function CompanyInfo() {
  return (
    <Card size="sm">
      <CardContent className="flex w-full -translate-y-3 flex-col items-center rounded-2xl px-3 pb-3 shadow-sm sm:hidden">
        <div className="-mt-11 rounded-full bg-white p-1.5">
          <div className="z-20 h-20 w-20 shrink-0 overflow-hidden rounded-full bg-linear-to-t from-white to-header shadow">
            <img
              alt="Logo tempero vasconcelos"
              src="https://storage.googleapis.com/prod-cardapio-web/uploads/company/logo/21276/6b6e86e0logo.jpeg"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <TypographyH1
            className="mb-2 px-6 font-semibold text-2xl text-foreground leading-6.5"
            text={"Docelos | by debora"}
          />
          <div className="flex items-center justify-center gap-4 text-muted-foreground text-xs">
            <div className="flex items-center justify-center gap-0.5">
              <MapPinCheck className="text-primary" size={13} />
              <span>Fortaleza - CE</span>
            </div>
            <div className="flex items-center justify-center gap-0.5">
              <MessageSquareMore className="text-primary" size={13} />
              <Link className="font-bold text-primary" to={"/"}>
                Mais informações
              </Link>
            </div>
          </div>
          <TypographyH4 className="mt-3 font-bold text-chart-3 text-xs">
            Aberto Agora - Até 23:00
          </TypographyH4>
        </div>
      </CardContent>
    </Card>
  );
}
