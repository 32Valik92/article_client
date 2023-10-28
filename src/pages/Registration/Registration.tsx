import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {FC} from "react";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {IDataResponseLogin, IRegister} from "../../interfaces";
import {authActions} from "../../redux";
import styles from "./Registration.module.scss";

const Registration: FC = () => {
   const isAuth = Boolean(useAppSelector(state => state.authReducer.data));
   const dispatch = useAppDispatch();

   const {
      register,
      handleSubmit,
      formState: {
         errors,
         isValid
      }
   } = useForm<IRegister>({
      defaultValues: {
         fullName: "Anton",
         email: "vasya@gmail.com",
         password: "asdqwe123#D"
      },
      mode: "onChange"
   });

   const onSubmit: SubmitHandler<IRegister> = async (values): Promise<void> => {
      const data: IDataResponseLogin = await dispatch(authActions.fetchRegister(values));

      if (!data.payload) {
         return alert("Failed to register");
      }

      if ("token" in data.payload) {
         window.localStorage.setItem("token", data.payload.tokenPair.accessToken);
      }
   };

   if (isAuth) {
      return <Navigate to={"/"}/>;
   }

   return (
      <Paper classes={{root: styles.root}}>
         <Typography classes={{root: styles.title}} variant="h5">
            Account creation
         </Typography>
         <div className={styles.avatar}>
            <Avatar sx={{width: 100, height: 100}}/>
         </div>
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextField error={Boolean(errors.fullName?.message)}
               helperText={errors.fullName?.message}
               {...register("fullName", {required: "Provide your full name"})}
               className={styles.field} label="Full name" fullWidth/>
            <TextField error={Boolean(errors.email?.message)}
               helperText={errors.email?.message}
               type='E-Mail'
               {...register("email", {required: "Provide your email address"})}
               className={styles.field} label="E-Mail" fullWidth/>
            <TextField error={Boolean(errors.password?.message)}
               helperText={errors.password?.message}
               type='password'
               {...register("password", {required: "Enter your password"})}
               className={styles.field} label="Password" fullWidth/>
            <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
               Registration
            </Button>
         </form>
      </Paper>
   );
};

export {Registration};