import { CompanyInfo } from "./components/companyInfo";
import { ProductMenu } from "./components/productMenu";

export function Menu() {
  return (
    <div className="w-full">
      <div className="h-40 w-full overflow-hidden bg-linear-to-t from-white to-primary sm:h-60">
        <img
          alt="Tempero vasconcelos"
          className="h-40 w-full bg-white object-cover object-center sm:h-60"
          src="https://storage.googleapis.com/prod-cardapio-web/uploads/company/image/21276/78ef55cbCapa_Card%C3%A1pio_Web-50.png"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 bg-background pb-6">
        <CompanyInfo />
        <div className="w-full">
          <ProductMenu />
        </div>
      </div>
    </div>
  );
}
