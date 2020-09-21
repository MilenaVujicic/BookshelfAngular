import {Publisher} from "./Publisher";

export class Book{
  id:number;
  title:string;
  pages:number;
  description:string;
  isbn:string;
  read:boolean;
  lent:boolean;
  cover: string | ArrayBuffer;
  private:boolean;
  owner?:number;
  publisher?:number;
  authors?:number[];
  shelves?:number[]
}
