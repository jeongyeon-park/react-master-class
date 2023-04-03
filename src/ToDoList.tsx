import { useState } from "react";
import {useForm} from "react-hook-form";

// function ToDoList() {
//   const [toDo, setTodo] = useState("");
//   const [toDoError, setToDoError] = useState("");
//   const onChange = (event:React.FocusEvent<HTMLInputElement>) => {
//     const {currentTarget : {value}} = event;
//     setToDoError("");
//     setTodo(value);
//   };

//   const onSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
//     event.preventDefault();
//     if(toDo.length < 10){
//       return setToDoError("To do should be longer");
//     }
//     console.log("submit");
//   }

//   return <div>
//     <form onSubmit={onSubmit}>
//       <input onChange={onChange} value={toDo} placeholder="Write a to do"/>
//       <button>Add</button>
//       {toDoError !== "" ? toDoError : null}
//     </form>
//   </div>;
// }

function ToDoList(){
  
  interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    userName: string;
    password1: string;
    extraError?: string;
  }

  const {
    register, 
    watch, 
    handleSubmit, 
    formState:{errors},
    setError
  } = useForm<IForm>({
    defaultValues: {
      email:"email@naver.com"
    }
  });
  const onValid = (data:IForm) => {
    if(data.password !== data.password1){
      setError("password", {message:"Password are not the same"}, {shouldFocus:true});
    }
    //setError("extraError", {message: "Server offline."});
  };

  console.log(errors);

  return (
    <div>
      <form style={{display:"flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
        <input {...register("email", {required: true, pattern:{
          value: /^[A-Za-z0-9._%+-]+@naver.com$/,
          message: "Email is required"
        }})} placeholder="email"/>
        <span>{errors.email?.message}</span>
        
        <input {...register("firstName", {
          required:true, 
          validate:{
            noNico: (value)=> value.includes("nico") ? "no nicos allowed": true,
            noNick: (value)=> value.includes("nick") ? "no nicos allowed" : true,
          }
        })}
          placeholder="First Name"/>
        <span>{errors.firstName?.message}</span>

        <input {...register("lastName", {required:true})} placeholder="Last Name"/>
        <span>{errors.lastName?.message}</span>

        <input {...register("userName", {required:true, minLength: 10})} placeholder="Username"/>
        <span>{errors.userName?.message}</span>

        <input 
          {...register("password", {
            required:"Password is reuired", minLength:{
              value:5,
              message: "Your password is required"
            }})} placeholder="Password"/>
        <span>{errors.password?.message}</span>

        <input {...register("password1", {required:true})} placeholder="Password1"/>
        <span>{errors.password1?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;