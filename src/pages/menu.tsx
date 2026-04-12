import { CompanyInfo } from "./components/companyInfo";

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
      <div className="bg-red-500 px-1 pb-6">
        <CompanyInfo />
      </div>
    </div>
  );
}
