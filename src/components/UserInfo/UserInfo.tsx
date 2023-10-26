import {FC} from "react";
import React from "react";

import styles from "./UserInfo.module.scss";

interface IProps {
    avatarUrl?: string
    fullName?: string
    additionalText?: string
}

const UserInfo: FC<IProps> = ({ avatarUrl, fullName, additionalText }) => {
   return (
      <div className={styles.root}>
         <img className={styles.avatar} src={avatarUrl} alt={fullName} />
         <div className={styles.userDetails}>
            <span className={styles.userName}>{fullName}</span>
            <span className={styles.additional}>{additionalText}</span>
         </div>
      </div>
   );
};

export {UserInfo};