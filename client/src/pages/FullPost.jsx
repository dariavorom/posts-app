/* eslint-disable */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../axios';
import { CommentsBlock, Index, Post } from '../components';
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data: postData } = await axios.get(`/posts/${id}`);
                setData(postData);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
            }
        };
        fetch();
    }, [id]);

    if (isLoading) {
        return <Post isLoading isFullPost />;
    }

    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={data.imageUrl ? `http://localhost:8000${data.imageUrl}` : ''}
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewCount}
                commentsCount={3}
                tags={data.tags}
                isFullPost>
                <ReactMarkdown children={data.text} />
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: 'Вася Пупкин',
                            avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                        },
                        text: 'Это тестовый комментарий 555555',
                    },
                    {
                        user: {
                            fullName: 'Иван Иванов',
                            avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                        },
                        text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                    },
                ]}
                isLoading={false}>
                <Index />
            </CommentsBlock>
        </>
    );
};
