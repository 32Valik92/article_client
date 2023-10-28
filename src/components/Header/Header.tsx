import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {FC}  from "react";
import React from "react";
import {Link} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import styles from "./Header.module.scss";

const Header: FC = () => {
   const dispatch = useAppDispatch();
   const isAuth = Boolean(useAppSelector(state => state.authReducer.data));

   const onClickLogout = (): void => {
      if (window.confirm("Are you sure you want to leave??")){
         dispatch(authActions.logout());
         window.localStorage.removeItem("token");
      }
   };
   
   return (
      <div className={styles.root}>
         <Container maxWidth="lg">
            <div className={styles.inner}>
               <Link className={styles.logo} to="/">
                  <div>HOME ARTICLES</div>
               </Link>
               <div className={styles.buttons}>
                  {isAuth ? (
                     <>
                        <Link to="/add-post">
                           <Button variant="contained">Write an article</Button>
                        </Link>
                        <Button onClick={onClickLogout} variant="contained" color="error">
                                   Log out
                        </Button>
                     </>
                  ) : (
                     <>
                        <Link to="/login">
                           <Button variant="outlined">Log in</Button>
                        </Link>
                        <Link to="/register">
                           <Button variant="contained">Registration</Button>
                        </Link>
                     </>
                  )}
               </div>
            </div>
         </Container>
      </div>
   );
};

export {Header};