import {FC} from "react";
import React from "react";
import {Outlet} from "react-router-dom";

import {Header} from "../components";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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