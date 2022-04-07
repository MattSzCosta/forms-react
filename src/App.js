import logo from "./logo.svg";
import "./App.css";
import { FormReactHook } from "./FormReactHook.js";
import { FormFormik } from "./FormFormik.js";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Grid container direction="row" space={3}>
          <Grid item xs={6}>
            <FormReactHook />
          </Grid>
          <Grid item xs={6}>
            <FormFormik />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
