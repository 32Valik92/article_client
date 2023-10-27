import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import React from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";

import {useAppSelector} from "../../hooks";
import {postService} from "../../services";
import styles from "./AddPost.module.scss";

const AddPost: FC = () => {
   const {postId} = useParams();
   const navigate = useNavigate();
   const isAuth = Boolean(useAppSelector(state => state.authReducer.data));
   const [isLoading, setLoading] = useState(false);
   const [text, setText] = useState("");
   const [title, setTitle] = useState("");
   const [tags, setTags] = useState("");
   const [imageURL, setImageURL] = useState("");
   const inputFileRef = useRef(null);

   const isEditing = Boolean(postId);

   const handleChangeFile = async (event: any) => {
      try {
         const formData = new FormData();
         const file = event.target.files[0];
         formData.append("image", file);
         // const {data} = await axios.post("/upload", formData);
         const {data} = await postService.uploadImg(formData);
         setImageURL(data.url);
      } catch (e) {
         console.warn(e);
         alert("ошибка при загрузке файла");
      }
   };

   const onClickRemoveImage = () => {
      setImageURL("");
   };

   const onChange = useCallback((value: any) => {
      setText(value);
   }, []);

   const onSubmit = async () => {
      console.log(11111);
      try {
         setLoading(true);

         const fields = {
            title,
            imageURL,
            tags: tags.split(","),
            text
         };

         const {data} = isEditing
            ? await postService.updateById(postId, fields)
            : await postService.create(fields);
            // ? await axiosService.patch(`/posts/${postId}`, fields)
            // : await axiosService.post("/posts", fields);

         const _id = isEditing ? postId : data._id;

         navigate(`/posts/${_id}`);
      } catch (e) {
         console.log(e);
         console.warn(e);
         alert("ошибка при создании статьи");
      }
   };

   useEffect(() => {
      if (postId) {
         postService.getById(postId)
            .then(({data}) => {
               setTitle(data.title);
               setText(data.text);
               setImageURL(data.imageURL);
               setTags(data.tags as unknown as string);
            });
      }
   }, []);

   const options = useMemo(
      () => ({
         spellChecker: false,
         maxHeight: "400px",
         autofocus: true,
         placeholder: "Введите текст...",
         status: false,
         autosave: {
            enabled: true,
            delay: 1000,
            uniqueId: postId
         },
      }),
      []
   );

   if (!window.localStorage.getItem("token") && !isAuth) {
      return <Navigate to={"/"}/>;
   }
   
   
   return (
      <Paper style={{padding: 30}}>
         <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
             Загрузить превью
         </Button>
         <input ref={inputFileRef} type="file"
            onChange={handleChangeFile}
            hidden/>
         {imageURL && (
            <>
               <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                    Удалить
               </Button>
               <img className={styles.image} src={`http://localhost:4444${imageURL}`} alt="Uploaded"/>
            </>
         )}

         <br/>
         <br/>
         <TextField
            classes={{root: styles.title}}
            variant="standard"
            placeholder="Заголовок статьи..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
         />
         <TextField
            classes={{root: styles.tags}}
            variant="standard"
            placeholder="Тэги"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            fullWidth
         />
         <SimpleMDE
            className={styles.editor}
            value={text}
            onChange={onChange}
            options={options}
         />
         <div className={styles.buttons}>
            <Button onClick={onSubmit} size="large" variant="contained">
               {isEditing ? "Сохранить" : "Опубликовать"}
            </Button>
            <Button size="large">Отмена</Button>
         </div>
      </Paper>
   );
};

export {AddPost};