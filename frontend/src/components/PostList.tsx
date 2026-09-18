import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Chip } from '@nextui-org/react';
import { Post } from '../types/Post';
import { Calendar, Clock, Tag } from 'lucide-react';
import DOMPurify from 'dompurify';

interface PostListProps {
  posts: Post[] | null;
  loading: boolean;
  error: string | null;
}

const PostList: React.FC<PostListProps> = ({ posts, loading, error }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const createExcerpt = (content: string) => {
    // First sanitize the HTML
    const sanitizedContent = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['p', 'strong', 'em', 'br'],
      ALLOWED_ATTR: [],
    });

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedContent;

    let textContent = tempDiv.textContent || tempDiv.innerText || '';
    textContent = textContent.trim();

    if (textContent.length > 200) {
      textContent = textContent.substring(0, 200).split(' ').slice(0, -1).join(' ') + '...';
    }

    return textContent;
  };

  if (error) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">{error}</div>;
  }

  return (
    <div className="w-full space-y-6">
      <>
        <div className="space-y-4">
          {posts?.map((post) => (
            <Card key={post.id} className="w-full p-2" isPressable={true} onPress={() => {}}>
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold text-left">{post.title}</h2>
                  <p className="text-small text-default-500">by {post.author?.name}</p>
                </div>
              </CardHeader>

              <CardBody>
                <p className="line-clamp-3">{createExcerpt(post.content)}</p>
              </CardBody>

              <CardFooter className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1 text-small text-default-500">
                  <Calendar size={16} />
                  {formatDate(post.createdAt)}
                </div>
                <div className="flex items-center gap-1 text-small text-default-500">
                  <Clock size={16} />
                  {post.readingTime} min read
                </div>
                <div className="flex flex-wrap gap-2">
                  <Chip className="bg-primary-100 text-primary">{post.category.name}</Chip>
                  {post.tags.map((tag) => (
                    <Chip key={tag.id} className="bg-default-100" startContent={<Tag size={14} />}>
                      {tag.name}
                    </Chip>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </>
    </div>
  );
};

export default PostList;
