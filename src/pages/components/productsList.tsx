import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typographyH3";
import { TypographyH4 } from "@/components/ui/typographyH4";
import { formatCurrecy } from "@/lib/format-currency";

export function ProductsList() {
  return (
    <div>
      <div className="mt-8 px-2 sm:px-0 md:mt-10">
        <div className="mb-3 px-1 sm:px-0 md:mb-5">
          <TypographyH3
            className="font-semibold text-gray-800 text-xl md:text-2xl"
            text="🔥 Os MAIS PEDIDOS de Tema"
          />
          <p className="mt-1 font-light text-gray-500 text-sm md:text-base">
            Primeira vez por aqui?! Experimente as favoritas da galera!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
          <Card className="card relative flex h-full min-h-28 w-full cursor-pointer flex-col justify-between p-1 sm:p-2">
            <CardHeader className="flex flex-1 flex-col justify-between p-2">
              <div className="space-y-2">
                <span className="inline-flex items-center whitespace-nowrap rounded-md bg-yellow-100 bg-opacity-70 px-2.5 py-1 font-medium text-xs text-yellow-600">
                  MAIS PEDIDO
                </span>
                <TypographyH4 className="line-clamp-2 font-semibold text-base text-gray-700 leading-6">
                  Frango à Milanesa (500ml) | O Carro chefe
                </TypographyH4>
                <p>
                  <strong>Top 1 de Vendas</strong>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A hic
                  iste quis, porro in dolore possimus saepe sed corporis amet
                  illum unde doloribus quae rerum ipsum laudantium inventore
                  vero quia!
                </p>
              </div>

              <div>
                <span>{formatCurrecy(14.9)}</span>
                <span>{formatCurrecy(19.9)}</span>
              </div>
            </CardHeader>
            <CardContent />
          </Card>
        </div>
      </div>
    </div>
  );
}
