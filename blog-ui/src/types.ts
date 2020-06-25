export interface BlogPost {
  id: string;
  title: string;
  content: string;
}

export interface BlogPostInput {
  title: string;
  content: string;
}

export interface EditBlogPostInput {
  id: string;
  title?: string;
  content?: string;
}
