import TagIcon from "@mui/icons-material/Tag";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import React, {FC} from "react";

import {SideBlock} from "../SideBlock/SideBlock";

interface IProps {
    items: string[];
    isLoading: boolean;
}

const TagsBlock: FC<IProps> = ({items, isLoading = true}) => {
   return (
      <SideBlock title="Tags">
         <List>
            {(isLoading ? [...Array(5)] : items).map((tagName: string, index: number) => (
               <a key={index} style={{textDecoration: "none", color: "black"}} href={`/tags/${tagName}`}>
                  <ListItem key={index} disablePadding>
                     <ListItemButton>
                        <ListItemIcon>
                           <TagIcon/>
                        </ListItemIcon>
                        {isLoading ? <Skeleton width={100}/> : <ListItemText primary={tagName}/>}
                     </ListItemButton>
                  </ListItem>
               </a>
            ))}
         </List>
      </SideBlock>
   );
};

export {TagsBlock};