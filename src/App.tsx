import {Container} from "@mui/material";
import React from "react";
import {Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AddPost, FullPost, Home, Login, Registration} from "./pages";

const App = () => {
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