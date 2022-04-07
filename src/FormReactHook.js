import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField, Box, Button, Typography } from "@material-ui/core";

const schema = Yup.object({
  steam: Yup.string()
    .min(10, "Steam must be longer than 10 characters")
    .required("Required"),
  questions: Yup.array().of(Yup.string().required("required")),
});

export const FormReactHook = () => {
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    watch,
  } = useForm({
    // mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      steam:
        "Which one of the following best expresses the main idea of the passage?",
      questions: ["Question A", "Question B", "Question C"],
      //   steam: "",
      //   questions: []
    },
  });
  //   watch("steam");
  const { fields } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = ({ steam, questions }) => {
    console.log(steam, questions);
    alert(`steam: ${steam}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {console.log("react hook - render")}
      <Typography style={{ marginBottom: 30 }}>React hooks </Typography>
      <label>Steam</label>
      <Box style={{ marginBottom: 30 }}>
        <Controller
          render={({ field }) => <TextField variant="outlined" {...field} />}
          name="steam"
          control={control}
          defaultValue=""
        />
        {errors.steam && <div>{errors.steam.message}</div>}
      </Box>

      <label>Questions</label>
      {fields.map((item, index) => {
        return (
          <Box key={index} style={{ margin: 10 }}>
            <Controller
              render={({ field }) => (
                <TextField
                  label={`Question ${index}`}
                  variant="outlined"
                  {...field}
                />
              )}
              name={`questions.${index}`}
              control={control}
              defaultValue={getValues(`questions.${index}`)}
            />
            {errors?.questions?.[index] && (
              <div>{errors.questions[index].message}</div>
            )}
          </Box>
        );
      })}
      <Button type="submit">Submit</Button>
    </form>
  );
};
