export type Blog = {
  _id: string;
  title: string;
  brief?: string|'no brief available';
  content: string;
  createdAt?: Date;
  authorId?: string;
  authorName?: string | 'Anonymous';
};
