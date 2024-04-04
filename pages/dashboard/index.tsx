import { SchoolHome } from "@/components/MainComponents/SchoolHome";
import { useRouter } from "next/router";
import Layaout from "@/components/Layaout";
import { useScholearYearSelectedQuery } from "@/generated/graphql";
import { useEffect } from "react";

function Dashboard() {
  const router = useRouter();
  const { data } = useScholearYearSelectedQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.scholearYearSelected) {
      sessionStorage.setItem(
        "year",
        data.scholearYearSelected.id_year?.toString()
      );
    }
  }, [data]);

  return (
    <Layaout textpage="Inicio">
      {router.asPath === "/dashboard" && <SchoolHome />}
    </Layaout>
  );
}

export default Dashboard;
