import { SchoolHome } from "@/components/MainComponents/SchoolHome";
import { useRouter } from "next/router";
import Layaout from "@/components/Layaout";
import { useQuery } from "@/lib/useApi";
import type { ScholarYear } from "@/types/api.types";
import { scholarYearService } from "@/services/api.service";
import { useEffect } from "react";

function Dashboard() {
  const router = useRouter();
  const { data } = useQuery<ScholarYear>('/scholar-years/selected');

  useEffect(() => {
    if (data?.id_year) {
      sessionStorage.setItem("year", data.id_year?.toString());
    }
  }, [data]);

  return (
    <Layaout textpage="Inicio">
      {router.asPath === "/dashboard" && <SchoolHome />}
    </Layaout>
  );
}

export default Dashboard;
