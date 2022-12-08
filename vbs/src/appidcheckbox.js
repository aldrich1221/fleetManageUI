import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function Checkboxes({handleChangeAPPSelectList}) {

  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  const handleChange1 = (event) => {
    // console.log(event)
    setChecked1(event.target.checked);
    console.log("check1",checked1)
    if (checked1==false){
    handleChangeAPPSelectList({"appid":1,"appname":"The Blu"},"add")
  }
  else{
    handleChangeAPPSelectList({"appid":1,"appname":"The Blu"},"remove")
  }

    
  };

  const handleChange2 = (event) => {
    // console.log(event)
    setChecked2(event.target.checked);
    console.log("check2",checked2)
  if (checked2==false){
      handleChangeAPPSelectList({"appid":2,"appname":"The Lab"},"add")
    }
    else{
      handleChangeAPPSelectList({"appid":2,"appname":"The Lab"},"remove")
    }
    
  };
  return (
    <div>
      The Blu
      <Checkbox
        
        checked={checked1}
        onChange={handleChange1}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      The Lab
      <Checkbox
        checked={checked2}
        onChange={handleChange2}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      
    </div>
  );
}