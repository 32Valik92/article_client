import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";

const Home = () => {
   return (
      <>
         <Tabs
            style={{marginBottom: 15}}
            value={0}
            aria-label="basic tabs example"
         >
            <Tab label="Новые"/>
            <Tab label="Популярные"/>
         </Tabs>
         <Grid container spacing={4}>
            <Grid xs={8} item>
               {/*{(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>*/}
               {/*   isPostsLoading ? (*/}
               {/*      <Post key={index} isLoading={true}/>*/}
               {/*   ) : (*/}
               {/*      <Post*/}
               {/*         key={index}*/}
               {/*         _id={obj._id}*/}
               {/*         title={obj.title}*/}
               {/*         imageUrl={obj.imageURL ? `http://localhost:4444${obj.imageURL}` : ""}*/}
               {/*         user={obj.user}*/}
               {/*         createdAt={obj.createdAt}*/}
               {/*         viewsCount={obj.viewsCount}*/}
               {/*         commentsCount={3}*/}
               {/*         tags={obj.tags}*/}
               {/*         isEditable={userData?._id === obj.user._id}*/}
               {/*      />*/}
               {/*   ))}*/}
            </Grid>
            <Grid xs={4} item>
               {/*<TagsBlock*/}
               {/*   items={tags.items}*/}
               {/*   isLoading={isTagsLoading}*/}
               {/*/>*/}
               {/*<CommentsBlock*/}
               {/*   items={[*/}
               {/*      {*/}
               {/*         user: {*/}
               {/*            fullName: "Вася Пупкин",*/}
               {/*            avatarUrl: "https://mui.com/static/images/avatar/1.jpg",*/}
               {/*         },*/}
               {/*         text: "Это тестовый комментарий",*/}
               {/*      },*/}
               {/*      {*/}
               {/*         user: {*/}
               {/*            fullName: "Иван Иванов",*/}
               {/*            avatarUrl: "https://mui.com/static/images/avatar/2.jpg",*/}
               {/*         },*/}
               {/*         text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",*/}
               {/*      },*/}
               {/*   ]}*/}
               {/*   isLoading={false}*/}
               {/*/>*/}
            </Grid>
         </Grid>
      </>
   );
};

export {Home};