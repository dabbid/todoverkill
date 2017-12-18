export default interface Todo {
  completed:boolean;
  created_at:string;
  description?:string;
  id:number;
  modified_at?:string;
  title:string;
}
