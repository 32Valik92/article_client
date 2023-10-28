import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import React, {BaseSyntheticEvent, FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";

import {baseURLServer} from "../../constants";
import {useAppSelector} from "../../hooks";
import {postService} from "../../services";
import {IEvent} from "../../types";
import styles from "./AddPost.module.scss";

const AddPost: FC = () => {
   const {postId} = useParams<string>();
   const navigate = useNavigate();
   const isAuth = Boolean(useAppSelector(state => state.authReducer.data));
   const [, setLoading] = useState<boolean>(false);
   const [text, setText] = useState<string>("");
   const [title, setTitle] = useState<string>("");
   const [tags, setTags] = useState<string>("");
   const [imageURL, setImageURL] = useState<string>("");
   const inputFileRef = useRef(null);

   const isEditing = Boolean(postId);

   const handleChangeFile = async (event: BaseSyntheticEvent): Promise<void> => {
      try {
         const formData: FormData = new FormData();
         const file = event.target.files[0];

         formData.append("image", file);

         const {data} = await postService.uploadImg(formData);
         setImageURL(data.url);
      } catch (e) {
         console.warn(e);
         alert("Error when uploading a file!");
      }
   };

   const onClickRemoveImage = (): void => {
      setImageURL("");
   };

   const onChange = useCallback((value: string): void => {
      setText(value);
   }, []);

   const onSubmit = async (): Promise<void> => {
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

         const _id = isEditing ? postId : data._id;

         navigate(`/posts/${_id}`);
      } catch (e) {
         console.log(e);
         console.warn(e);
         alert("Error when creating an article!");
      }
   };

   useEffect(() => {
      if (postId) {
         postService.getById(postId)
            .then(({data}): void => {
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
         placeholder: "Enter text...",
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
                Upload a preview
         </Button>
         <input ref={inputFileRef} type="file"
            onChange={handleChangeFile}
            hidden/>
         {imageURL && (
            <>
               <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                        Delete
               </Button>
               <img className={styles.image} src={`${baseURLServer}${imageURL}`} alt="Uploaded"/>
            </>
         )}

         <br/>
         <br/>
         <TextField
            classes={{root: styles.title}}
            variant="standard"
            placeholder="Article title..."
            value={title}
            onChange={(e: IEvent): void => setTitle(e.target.value)}
            fullWidth
         />
         <TextField
            classes={{root: styles.tags}}
            variant="standard"
            placeholder="Тэги"
            value={tags}
            onChange={(e: IEvent): void => setTags(e.target.value)}
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
               {isEditing ? "Save" : "Publish"}
            </Button>
            <Button size="large">Cancel</Button>
         </div>
      </Paper>
   );
};

export {AddPost};