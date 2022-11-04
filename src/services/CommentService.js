import { baseService } from "./baseService";

export class CommentService extends baseService {
  constructor() {
    super();
  }

  insertCommentService = (commentDetail) => {
    return this.post(`Comment/insertComment`, commentDetail);
  };

  deleteCommentService = (idComment) => {
    return this.delete(`Comment/deleteComment?idComment=${idComment}`);
  };

  updateCommentService = (idComment, newContentComment) => {
    return this.put(
      `Comment/updateComment?id=${idComment}&contentComment=${newContentComment}`
    );
  };
}

export const commentService = new CommentService();
