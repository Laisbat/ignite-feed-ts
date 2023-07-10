import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

interface IAuthor {
  name: string;
  avatarUrl: string;
  role: string;
}

interface IContent {
  type: 'paragraph' | 'link';
  content: string;
}

export interface IPost {
  id?: number;
  author: IAuthor,
  content: IContent[],
  publishedAt: Date;
}

interface PostProps {
  post: IPost;
}


export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(["Post muito bacana, hein?!"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "America/Sao_Paulo",
  }).format(post.publishedAt);

  function handleCreateNewComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange({ target }: ChangeEvent<HTMLTextAreaElement> ) {
    target.setCustomValidity("");
    setNewCommentText(target.value);
  }

  function handleNewCommentInvalid({ target }: InvalidEvent<HTMLTextAreaElement>) {
    target.setCustomValidity("Por favor, preencha o comentário.");
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time dateTime="2022-05-05 08:11:09">{publishedDateFormatted}</time>
      </header>
      <div className={styles.content}>
        {post.content?.map((line, index) => {
          if (line.type === "paragraph") {
            return <p key={index++}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={index++}>
                <a
                  key={index++}
                  href={line.content}
                  target="_blank"
                  rel="noreferrer"
                >
                  {line.content}
                </a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <textarea
          placeholder="Comente algo..."
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments?.map((comment, index) => {
          return (
            <Comment
              key={index++}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
