import {FC, useEffect, useState} from "react";
import React from "react";
import Markdown from "react-markdown";
import {useParams} from "react-router-dom";

import {AddComment,CommentsBlock, Post} from "../../components";
import {IPost} from "../../interfaces";
import {postService} from "../../services";

const FullPost: FC = () => {
   const [data, setData] = useState<IPost>();
   const [isLoading, setLoading] = useState(true);
   const {postId} = useParams();
   useEffect(() => {
      postService.getById(postId)
         .then(res => {
            setData(res.data);
            setLoading(false);
         }).catch(err => {
            console.warn(err);
            alert("Ошибка при получении статьи");

         });
   }, [postId]);

   if (isLoading) {
      return <Post isLoading={isLoading} isFullPost/>;
   }
   console.log(data.imageURL);
   return (
      <>
         <Post
            _id={data._id}
            title={data.title}
            imageUrl={data.imageURL ? `http://localhost:4444${data.imageURL}` : ""}
            user={data.user}
            createdAt={data.createdAt}
            viewsCount={data.viewsCount}
            commentsCount={3}
            tags={data.tags}
            isFullPost
         >
            <p>
               {/* eslint-disable-next-line react/no-children-prop */}
               <Markdown children={data.text}/>
            </p>
         </Post>
         <CommentsBlock
            items={[
               {
                  user: {
                     fullName: "Вася Пупкин",
                     avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                  },
                  text: "Это тестовый комментарий 555555",
               },
               {
                  user: {
                     fullName: "Иван Иванов",
                     avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                  },
                  text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
               },
            ]}
            isLoading={false}
         >
            <AddComment />
         </CommentsBlock>
      </>
   );
};

export {FullPost};