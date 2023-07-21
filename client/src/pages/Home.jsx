import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { CommentsBlock, Post, TagsBlock } from '../components';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
    const dispatch = useDispatch();
    const { posts, tags } = useSelector((state) => state.posts);
    const userData = useSelector((state) => state.auth.data);

    const isPostsLoading = posts.status === 'loading';
    const isTagsLoading = tags.status === 'loading';

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, [dispatch]);

    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                <Tab label="Новые" />
                <Tab label="Популярные" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {isPostsLoading
                        ? [...Array(5)].map((_, index) => <Post key={index} isLoading />)
                        : posts.items.map((post) => (
                              <Post
                                  key={post._id}
                                  id={post._id}
                                  title={post.title}
                                  imageUrl={
                                      post.imageUrl ? `http://localhost:8000${post.imageUrl}` : ''
                                  }
                                  user={post.user}
                                  createdAt={post.createdAt}
                                  viewsCount={post.viewCount}
                                  commentsCount={3}
                                  tags={post.tags}
                                  isEditable={userData?._id === post.user._id}
                              />
                          ))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tags.items} isLoading={isTagsLoading} />
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'Вася Пупкин',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                    fullName: 'Иван Иванов',
                                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    );
};
