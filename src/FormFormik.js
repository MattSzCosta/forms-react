import React from "react";
import { useFormik, FieldArray, getIn, Formik } from "formik";
import * as Yup from "yup";
import { TextField, Box, Button, Typography } from "@material-ui/core";
const schema = Yup.object({
  steam: Yup.string()
    .min(10, "Steam must be longer than 10 characters")
    .required("Required"),
  questions: Yup.array().of(Yup.string().required("required")),
});
export const FormFormik = () => {
  const submit = ({ steam, questions }) => {
    console.log(steam, questions);
  };
  return (
    <Formik
      validationSchema={schema}
      onSubmit={submit}
      initialValues={{
        steam:
          "Which one of the following best expresses the main idea of the passage?",
        questions: ["Question A", "Question B", "Question C"],
        //   steam: "",
        //   questions: []
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        handleBlur,
      }) => (
        <form onSubmit={handleSubmit}>
          {console.log("formik render")}
          <Typography style={{ marginBottom: 30 }}>Formik </Typography>
          <label>Steam</label>
          <Box style={{ marginBottom: 30 }}>
            <TextField
              id="steam"
              name="steam"
              variant="outlined"
              value={values.steam}
              onChange={handleChange}
              error={touched.steam && Boolean(errors.steam)}
              helperText={touched.steam && errors.steam}
              onBlur={handleBlur}
            />
          </Box>
          <label>Questions</label>
          <FieldArray name="questions">
            {() =>
              values.questions &&
              values.questions.map((item, index) => {
                const question = `questions.${index}`;
                const touchedQuestion = getIn(touched, question);
                const errorQuestion = getIn(errors, question);
                return (
                  <Box key={index}>
                    <TextField
                      margin="normal"
                      variant="outlined"
                      label="Question"
                      name={question}
                      value={item}
                      required
                      helperText={
                        touchedQuestion && errorQuestion ? errorQuestion : ""
                      }
                      error={Boolean(touchedQuestion && errorQuestion)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Box>
                );
              })
            }
          </FieldArray>

          <Button type="submit">Submit</Button>
        </form>
      )}
    </Formik>
  );
};
