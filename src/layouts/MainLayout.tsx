import {FC} from "react";
import React from "react";
import {Outlet} from "react-router-dom";

import {Header} from "../components";

interface IProps {

}

const MainLayout: FC<IProps> = () => {
   return (
      <>
         <Header/>
         <Outlet/>
      </>
   );
};

export {MainLayout};