import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import {FC, ReactNode} from "react";
import React from "react";

import {ICommentUser} from "../../interfaces";
import {SideBlock} from "../SideBlock/SideBlock";

interface IProps {
    items?: ICommentUser[];
    children?: ReactNode;
    isLoading?: boolean;
}

const CommentsBlock: FC<IProps> = ({ items, children, isLoading = true }) => {
   return (
      <SideBlock title="Comments">
         <List>
            {(isLoading ? [...Array(5)] : items).map((obj: ICommentUser, index: number) => (
               <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                     <ListItemAvatar>
                        {isLoading ? (
                           <Skeleton variant="circular" width={40} height={40} />
                        ) : (
                           <Avatar alt={obj.user.fullName} src={obj.user.avatarURL} />
                        )}
                     </ListItemAvatar>
                     {isLoading ? (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                           <Skeleton variant="text" height={25} width={120} />
                           <Skeleton variant="text" height={18} width={230} />
                        </div>
                     ) : (
                        <ListItemText
                           primary={obj.user.fullName}
                           secondary={obj.text}
                        />
                     )}
                  </ListItem>
                  <Divider variant="inset" component="li" />
               </React.Fragment>
            ))}
         </List>
         {children}
      </SideBlock>
   );
};

export {CommentsBlock};