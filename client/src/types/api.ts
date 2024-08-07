export type BaseEntity = {
  id: string;
  created_at: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type User = Entity<{
  email: string;
  password: string;
  role: string;
  first_name: string | null;
  last_name: string | null;
  photo_url: string | null;
  phone: string | null;
  enable: number;
}>;

export type Discussion = Entity<{
  discussion_title: string;
  discussion_body: string;
  author_id: string;
  // SOMETIMES I WANT TO GET THE AUTHOR NAME
  author_name?: string;
}>;

export type Comment = Entity<{
  discussion_id: number;
  comment_body: string;
  author_id: string;
  created_date: number;
}>;
