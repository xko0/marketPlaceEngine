import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
// import { useEffect } from "react";
// import { Grid } from "@mui/material";
// import { BarLoader } from "react-spinners";
// import Cookies from "js-cookie";
import Home from "./layouts/Home";
import "./app.css"

export const App = observer(() => {

  // if (userStore.loading) {
  //   return (
  //     <Grid display='flex' height='100vh' justifyContent='center' alignItems='center'>
  //       <BarLoader color="#17c1e8" />
  //     </Grid>
  //   )
  // }

  return (  
    <Router>
      <main>
        <AppRoutes />
      </main>
    </Router>
  )
})

function AppRoutes() {

  // function PrivateRoute({ component }) {
  //   if (!userStore.authenticated) {
  //     return <Navigate to="/login" />;
  //   } else if (!userStore.user.has_profile) {
  //     return <Navigate to="/new_profile" />;
  //   }
  //   return component;
  // }

  return(
    <Routes>
      <Route path="/" element={<Navigate to='/home'/>}/>
      <Route path="/home" element={<Home />}/>
    </Routes>
  )
}