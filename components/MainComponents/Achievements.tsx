import DynamicTable from "../DynamicTable";
import { useMemo } from "react";
import { useAchievementsQuery } from "../../generated/graphql";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

const columns = [
  {
    Header: "Periodo",
    accessor: "period",
  },
  {
    Header: "Descripcion",
    accessor: "description",
  },
];

function Achievements() {
  const today = new Date();
  const year = today.getFullYear();
  const [active, setActive] = useState(false);
  const { data, loading, error } = useAchievementsQuery();
  console.log(data, error);

  useEffect(() => {
    setActive(true);
  }, []);

  const processedAchievements = useMemo(() => {
    if (!data?.achievements) return [];
    return data.achievements.map((achievements, index) => ({
      period: achievements?.period ?? "",
      description: achievements?.description ?? "",
    }));
  }, [data]);

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <Grid container className="pb-4">
        <Grid item xs={12}>
          <strong className="text-2xl text-black ps-8">
            Logros por cursos para el año {year}
          </strong>
        </Grid>
      </Grid>
      <Grid
        container
        className="mx-auto bg-white border-2 shadow-2xl rounded-[2rem] p-5"
      >
        <Grid item xs={12} className="h-full">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-blue3"></span>
            </div>
          ) : data?.achievements ? (
            <div
              className="d-flex border-white py-4 h-full"
              style={{ height: "32rem" }}
            >
              <DynamicTable columns={columns} data={processedAchievements} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Achievements;
