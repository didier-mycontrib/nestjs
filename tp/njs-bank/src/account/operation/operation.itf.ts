
//Generic agnostic Operation interface (not specific to mongoose or dto or ...)
export interface Operation {
    id?: number;
    label: string;
    amount: number;
    opDateTime:Date;
    //account?:Account;
  }