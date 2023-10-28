import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, {ReactNode} from "react";
import {FC} from "react";

import styles from "./SideBlock.module.scss";

interface IProps {
    title: string;
    children: ReactNode;
}

const SideBlock: FC<IProps> = ({ title, children }) => {
   return (
      <Paper classes={{ root: styles.root }}>
         <Typography variant="h6" classes={{ root: styles.title }}>
            {title}
         </Typography>
         {children}
      </Paper>
   );
};

export {SideBlock};
