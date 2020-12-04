import { Category } from "./caegory"


export type Transaction = {

  id: number,
  description: string,
  category: Category,
  date: Date,

};