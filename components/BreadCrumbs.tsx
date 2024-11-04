import { useRouter } from "next/router";

type TBreadcrumbs = {
  page: string;
};

export const BreadCrumbs = ({ page }: TBreadcrumbs) => {
  const router = useRouter();

  function convertirTexto(texto: string | any) {
    if (typeof texto === 'string') {
      // Dividir el texto en palabras utilizando los guiones como separadores
      const palabras = texto.split("-");

      // Capitalizar la primera letra de cada palabra y unirlas de nuevo
      const textoConvertido = palabras
        .map((palabra: any) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(" ");

      return textoConvertido;
    } else {
      // Si el texto no es de tipo string, devolverlo tal cual
      return texto;
    }
  }
  return (
    <div className=" flex items-center text-main-blue gap-3 text-sm font-medium">
      <p className="hover:text-main-blue transition duration-500">{page}</p>
      {router.query.componente && (
        <>
          <span> {">"} </span>
          <p className="hover:text-main-blue transition duration-500">{convertirTexto(router.query.componente)}</p>
        </>
      )}
    </div>
  );
};
