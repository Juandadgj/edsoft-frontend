import { SchoolHome } from "@/components/MainComponents/SchoolHome";
import { useRouter } from "next/router";
import Layaout from "@/components/Layaout";

function Dashboard() {
  const router = useRouter();
  return <Layaout>{router.asPath === "/dashboard" && <SchoolHome />}</Layaout>;
}

export default Dashboard;
