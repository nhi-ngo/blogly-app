import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Post } from '../types/Post';
import { postService } from '../services/postService';
import { Card, CardHeader, CardBody, CardFooter, Chip, Button, Divider, Avatar } from '@nextui-org/react';
import { Calendar, Clock, Tag, Edit, Trash, ArrowLeft, Share } from 'lucide-react';

interface PostPageProps {
  isAuthenticated?: boolean;
}

const PostPage: React.FC<PostPageProps> = ({ isAuthenticated }) => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error('Post ID is required');
        const fetchedPost = await postService.getPost(id);
        setPost(fetchedPost);
        setError(null);
      } catch (err) {
        setError('Failed to load the post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const createSanitizedHTML = (content: string) => {
    return {
      __html: DOMPurify.sanitize(content, {
        ALLOWED_TAGS: ['p', 'strong', 'em', 'br'],
        ALLOWED_ATTR: [],
      }),
    };
  };

  if (error || !post) {
    return <div>Error or No post</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Card className="w-full">
        <CardHeader>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar name={post.author?.name} size="sm" />
              <span className="text-default-600">{post.author?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-default-500">
              <Calendar size={16} />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-default-500">
              <Clock size={16} />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          {post && <div className="prose max-w-none" dangerouslySetInnerHTML={createSanitizedHTML(post.content)} />}
        </CardBody>

        <CardFooter className="flex flex-col items-start gap-4">
          <Divider />
          <div className="flex flex-wrap gap-2">
            <Chip color="primary" variant="flat">
              {post?.category.name}
            </Chip>
            {post?.tags.map((tag) => (
              <Chip key={tag.id} variant="flat" startContent={<Tag size={14} />}>
                {tag.name}
              </Chip>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostPage;
