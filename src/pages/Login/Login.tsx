import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {FC} from "react";
import React from "react";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {IDataResponceLogin, ILogin} from "../../interfaces";
import {authActions} from "../../redux";
import styles from "./Login.module.scss";

const Login: FC = () => {
   const isAuth = Boolean(useAppSelector(state => state.authReducer.data));
   const dispatch = useAppDispatch();
   const {
      register,
      handleSubmit,
      formState: {
         errors,
         isValid
      }
   } = useForm({
      defaultValues: {
         email: "strukalo@gmail.com",
         password: "asdqwe123#D"
      },
      mode: "onChange"
   });

   const onSubmit = async (values: ILogin) => {
      const data: IDataResponceLogin = await dispatch(authActions.fetchAuth(values));
      // console.log(data);
      if (!data.payload) {
         return alert("Не удалось авторизоваться");
      }
      if ("tokenPair" in data.payload) {
         window.localStorage.setItem("token", data.payload.tokenPair.accessToken);
      }
   };

   if (isAuth) {
      return <Navigate to={"/"}/>;
   }
   return (
      <Paper classes={{root: styles.root}}>
         <Typography classes={{root: styles.title}} variant="h5">
               Вход в аккаунт
         </Typography>
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
               className={styles.field}
               label="E-Mail"
               type="email"
               error={Boolean(errors.email?.message)}
               helperText={errors.email?.message}
               {...register("email", {required: "Укажите почту"})}
               fullWidth
            />
            <TextField
               className={styles.field}
               label="Пароль"
               error={Boolean(errors.password?.message)}
               helperText={errors.password?.message}
               {...register("password", {required: "Укажите пароль"})}
               fullWidth/>
            <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                   Войти
            </Button>
         </form>
      </Paper>
   );
};

export {Login};