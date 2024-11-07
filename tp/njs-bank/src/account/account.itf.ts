//import { Customer } from "src/customer/customer.itf";

//Generic agnostic Account interface (not specific to mongoose or dto or ...)
export interface Account {
    num?: number;
    label: string;
    balance: number;
    //owner?:Customer;
  }