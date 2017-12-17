export default interface Todo {
  completed:boolean;
  completed_at?:string;
  created_at:string;
  description?:string;
  id:number;
  modified_at?:string;
  title:string;
}
