// src/components/CommentBox.tsx

import React, { useState, useEffect } from "react";

interface CommentBoxProps {
  userId: number;
  showId: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ userId, showId }) => {
  const [comment, setComment] = useState('');
  const [debouncedComment, setDebouncedComment] = useState(comment);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedComment(comment);
    }, 500);
    return () => clearTimeout(handler);
  }, [comment]);

  useEffect(() => {
    if (debouncedComment.trim() !== '') {
      fetch(
        `https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api/Ratings/comment`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            showId,
            comment: debouncedComment,
          }),
        }
      ).then((res) => {
        if (!res.ok) {
          console.error("Failed to update comment");
        }
      }).catch((err) => {
        console.error("Error posting comment:", err);
      });
    }
  }, [debouncedComment, userId, showId, token]);

  return (
    <div className="comment-input">
      <input
        type="text"
        placeholder="Leave a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{
          color: 'white',
          backgroundColor: '#222',
          border: '1px solid #ccc',
          borderRadius: '6px',
          padding: '8px',
          width: '100%',
        }}
      />
    </div>
  );
};

export default CommentBox;
