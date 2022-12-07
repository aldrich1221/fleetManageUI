import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function Checkboxes() {
  const [checked1, setChecked1] = React.useState(true);
  const [checked2, setChecked2] = React.useState(true);

  const handleChange1 = (event) => {
    console.log(event)
    setChecked1(event.target.checked);
    
  };

  const handleChange2 = (event) => {
    console.log(event)
    setChecked2(event.target.checked);
    
  };
  return (
    <div>
      <Checkbox
        checked={checked1}
        onChange={handleChange1}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Checkbox
        checked={checked2}
        onChange={handleChange2}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
      <Checkbox disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />
      <Checkbox disabled checked inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
      <Checkbox
        defaultChecked
        indeterminate
        inputProps={{ 'aria-label': 'indeterminate checkbox' }}
      />
      <Checkbox
        defaultChecked
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      />
      <Checkbox
        defaultChecked
        size="small"
        inputProps={{ 'aria-label': 'checkbox with small size' }}
      />
    </div>
  );
}