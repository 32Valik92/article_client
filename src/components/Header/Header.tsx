import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {FC}  from "react";
import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {useAppDispatch} from "../../hooks";
import {authActions, selectIsAuth} from "../../redux";
import styles from "./Header.module.scss";

const Header: FC = () => {
   const dispatch = useAppDispatch();
   const isAuth = useSelector(selectIsAuth);
   
   const onClickLogout = (): void => {
      if (window.confirm("Ви точно хочете вийти?")){
         dispatch(authActions.logout());
         window.localStorage.removeItem("token");
      }
   };
   
   return (
      <div className={styles.root}>
         <Container maxWidth="lg">
            <div className={styles.inner}>
               <Link className={styles.logo} to="/">
                  <div>ARTICLES</div>
               </Link>
               <div className={styles.buttons}>
                  {isAuth ? (
                     <>
                        <Link to="/add-post">
                           <Button variant="contained">Написать статью</Button>
                        </Link>
                        <Button onClick={onClickLogout} variant="contained" color="error">
                                   Выйти
                        </Button>
                     </>
                  ) : (
                     <>
                        <Link to="/login">
                           <Button variant="outlined">Войти</Button>
                        </Link>
                        <Link to="/register">
                           <Button variant="contained">Создать аккаунт</Button>
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