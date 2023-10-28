import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, {useEffect} from "react";

import {CommentsBlock, Post, TagsBlock} from "../../components";
import {baseURLServer} from "../../constants";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {IPost} from "../../interfaces";
import {postActions} from "../../redux";

const Home = () => {
   const dispatch = useAppDispatch();
   const userData = useAppSelector(state => state.authReducer.data);
   const {posts, tags} = useAppSelector(state => state.postReducer);

   // console.log(posts.items)
   const isPostsLoading = posts.status === "loading";
   const isTagsLoading = tags.status === "loading";

   useEffect(() => {
      dispatch(postActions.fetchPosts());
      dispatch(postActions.fetchTags());
   }, [dispatch]);
    
   return (
      <>
         <Tabs
            style={{marginBottom: 15}}
            value={0}
            aria-label="basic tabs example"
         >
            <Tab label="New"/>
            <Tab label="Popular"/>
         </Tabs>
         <Grid container spacing={4}>
            <Grid xs={8} item>
               {(isPostsLoading ? [...Array(5)] : posts.items).map((obj: IPost, index: number) =>
                  isPostsLoading ? (
                     <Post key={index} isLoading={true}/>
                  ) : (
                     <Post
                        key={index}
                        _id={obj._id}
                        title={obj.title}
                        imageURL={obj.imageURL ? `${baseURLServer}${obj.imageURL}` : ""}
                        user={obj.user}
                        createdAt={obj.createdAt}
                        viewsCount={obj.viewsCount}
                        commentsCount={3}
                        tags={obj.tags}
                        isEditable={userData?._id === obj.user._id}
                     />
                  ))}
            </Grid>
            <Grid xs={4} item>
               <TagsBlock
                  items={tags.items}
                  isLoading={isTagsLoading}
               />
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
               />
            </Grid>
         </Grid>
      </>
   );
};

export {Home};