import {
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
} from "@/generated/graphql";
import React, { useState } from "react";

export const AchievementsForm = ({
  achievement,
  setAchievement,
  onClose,
}: {
  achievement: any;
  setAchievement: any;
  onClose: any;
}) => {
  const [createAchievement] = useCreateAchievementMutation();
  const [updateAchievement] = useUpdateAchievementMutation();

  const [errors, setErrors] = useState<any>({
    description: "",
    id_course: 0,
    period: 0,
  });
  const validationEvent = () => {
    if (achievement.description) {
      return true;
    } else {
      for (const item in achievement) {
        if (!achievement[item]) {
          setErrors((err: any) => ({ ...err, [item]: "Campo Requerido!" }));
        } else {
          setErrors((err: any) => ({ ...err, [item]: "" }));
        }
      }
      return false;
    }
  };
  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }

    for (const i in achievement) {
      if (i === "id_achievement") {
        setAchievement((val: any) => ({ ...val, [i]: undefined }));
      } else if (i === "type_id") {
        setAchievement((val: any) => ({ ...val, [i]: 1 }));
      } else {
        setAchievement((val: any) => ({ ...val, [i]: "" }));
      }
    }
  };
  const handlerCreateAchievement = async () => {
    if (validationEvent()) {
      await createAchievement({
        variables: {
          createAchievementInput: {
            description: achievement.description,
            id_course: Number(achievement.id_course),
            period: Number(achievement.period),
          },
        },
      }).then((res) => {
        if (res.data) {
          onClose();
          cleaningStates();
        }
      });
    }
  };
  const handlerUpdateAchievement = async () => {
    if (validationEvent()) {
      await updateAchievement({
        variables: {
          updateAchievementInput: {
            id_achievement: achievement.id_achievement,
            description: achievement.description,
            id_course: Number(achievement.id_course),
            period: Number(achievement.period),
          },
        },
      }).then((res) => {
        if (res.data) {
          onClose();
          cleaningStates();
        }
      });
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="form-control text-black col-span-2">
        <div className="label text-gray5 p-1">
          <label className="text-xs">Descripcion</label>
        </div>
        <div className="w-full">
          <input
            name="description"
            value={achievement.description}
            onChange={({ target }: any) =>
              setAchievement({ ...achievement, [target.name]: target.value })
            }
            className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
          />
        </div>
        <div>
          <label className="label-text-alt text-[red]">
            {errors.description}
          </label>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 col-span-2">
        <div>
          {!achievement?.id_achievement ? (
            <button
              onClick={handlerCreateAchievement}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Agregar
            </button>
          ) : (
            <button
              onClick={handlerUpdateAchievement}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Editar
            </button>
          )}
        </div>
        <div>
          <button
            onClick={() => {
              onClose();
              cleaningStates();
            }}
            className="btn bg-red-500 hover:bg-red-600 text-white border-none transition duration-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
