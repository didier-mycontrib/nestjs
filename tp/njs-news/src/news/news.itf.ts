//Generic agnostic News interface (not specific to mongoose or dto or ...)
export interface News {
  id?: string;
  title: string;
  text: string;
  timestamp: string;
}