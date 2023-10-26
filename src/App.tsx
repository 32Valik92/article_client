import {Container} from "@mui/material";
import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";

import {useAppDispatch} from "./hooks";
import {MainLayout} from "./layouts";
import {AddPost, FullPost, Home, Login, Registration} from "./pages";
import {authActions} from "./redux";

const App = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(authActions.fetchAuthMe());
   }, []);
   return (
      <>
         <Container maxWidth="lg">
            <Routes>
               <Route path={"/"} element={<MainLayout/>}>
                  <Route path={"/"} element={<Home/>}/>
                  <Route path={"posts/:postId"} element={<FullPost/>}/>
                  <Route path={"posts/:postId/edit"} element={<AddPost/>}/>
                  <Route path={"add-post"} element={<AddPost/>}/>
                  <Route path={"login"} element={<Login/>}/>
                  <Route path={"register"} element={<Registration/>}/>
               </Route>
            </Routes>
         </Container>
      </>
   );
};

export default App;