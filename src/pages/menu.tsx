import { CompanyInfo } from "./components/companyInfo";
import { ProductsList } from "./components/productsList";

export function Menu() {
  return (
    <div className="w-full">
      <div className="h-40 w-full overflow-hidden bg-linear-to-t from-white to-primary sm:h-60">
        <img
          alt="Tempero vasconcelos"
          className="h-40 w-full bg-white object-cover object-center sm:h-60"
          src="https://storage.googleapis.com/prod-cardapio-web/uploads/company/image/21276/619ded64IMG_1925.jpeg"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 bg-background pb-6">
        <CompanyInfo />
        <ProductsList />
      </div>
    </div>
  );
}
