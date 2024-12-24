import {
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
} from "@/generated/graphql";
import React, { useState } from "react";

export const AchievementsForm = ({ achievement, onClose }: { achievement: any; onClose: any }) => {
  const [createAchievement] = useCreateAchievementMutation();
  const [updateAchievement] = useUpdateAchievementMutation();

  const [formValue, setFormValue] = useState<any>({
    description: "",
    id_course: 0,
    period: 0,
  });
  const [errors, setErrors] = useState<any>({
    description: "",
    id_course: 0,
    period: 0,
  });
  const validationEvent = () => {
    if (formValue.description) {
      return true;
    } else {
      for (const item in formValue) {
        if (!formValue[item]) {
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

    for (const i in formValue) {
      if (i === "id_achievement") {
        setFormValue((val: any) => ({ ...val, [i]: undefined }));
      } else if (i === "type_id") {
        setFormValue((val: any) => ({ ...val, [i]: 1 }));
      } else {
        setFormValue((val: any) => ({ ...val, [i]: "" }));
      }
    }
  };
  const handlerCreateAchievement = async () => {
    return await createAchievement({
      variables: { createAchievementInput: formValue },
    });
  };
  const handlerUpdateAchievement = async () => {
    return await updateAchievement({
      variables: { updateAchievementInput: formValue },
    });
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="form-control text-black">
        <div className="label text-gray5 p-1">
          <label className="text-xs">Descripcion</label>
        </div>
        <div className="w-full">
          <input
            name="description"
            value={achievement.description}
            onChange={({ target }: any) =>
              setFormValue({ ...formValue, [target.name]: target.value })
            }
            className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
          />
        </div>
        <div>
          <label className="label-text-alt text-[red]">
            {formValue.description}
          </label>
        </div>
      </div>
    </div>
  );
};
