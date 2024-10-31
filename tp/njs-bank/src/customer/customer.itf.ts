//Generic agnostic Customer interface (not specific to mongoose or dto or ...)
export interface Customer {
  id?: number;
  firstname: string;
  lastname: string;
}