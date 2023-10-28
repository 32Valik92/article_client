import {FC, useEffect, useState} from "react";
import React from "react";
import Markdown from "react-markdown";
import {useParams} from "react-router-dom";

import {AddComment,CommentsBlock, Post} from "../../components";
import {baseURLServer} from "../../constants";
import {IPost} from "../../interfaces";
import {postService} from "../../services";

const FullPost: FC = () => {
   const [data, setData] = useState<IPost>();
   const [isLoading, setLoading] = useState<boolean>(true);
   const {postId} = useParams<string>();
   useEffect(() => {
      postService.getById(postId)
         .then(res => {
            setData(res.data);
            setLoading(false);
         }).catch(err => {
            console.warn(err);
            alert("Error while retrieving the article");

         });
   }, [postId]);

   if (isLoading) {
      return <Post isLoading={isLoading} isFullPost/>;
   }
   return (
      <>
         <Post
            _id={data._id}
            title={data.title}
            imageURL={data.imageURL ? `${baseURLServer}${data.imageURL}` : ""}
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
                     fullName: "Rafael",
                     avatarURL: "https://mui.com/static/images/avatar/1.jpg",
                  },
                  text: "This is a test comment",
               },
               {
                  user: {
                     fullName: "Leo",
                     avatarURL: "https://mui.com/static/images/avatar/2.jpg",
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