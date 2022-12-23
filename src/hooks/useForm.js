import React, { useState } from "react";
import {omit} from 'lodash'

const useForm = () => {
  const [values, setValue] = useState({});
  const [errors, setErrors] = useState({});

  const validate = (event, name, value) =>{
    switch(name) {
      case 'username':
        if(value.length <= 4){

          setErrors({
            ...errors,
            username: "Username errors "
          })
        }else{
          let newObj = omit(errors, "username")
          setErrors(newObj)
        }
        break;
      default: break
    }
  }

  const handleChange = (event) => {
    event.persist();
    let name = event.target.name
    let val = event.target.value

    validate(event, name, val)

    setValue({
      ...values, 
      [name]: val
    })
  };

  return {
    values,
    errors,
    handleChange,
  };
};

export default useForm;
