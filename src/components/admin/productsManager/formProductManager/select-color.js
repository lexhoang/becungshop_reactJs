import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;;

const optionColors = ["Màu đen", "Màu trắng","Màu be","Màu xám", "Màu xanh lam", "Màu xanh lá", "Màu hồng", "Màu vàng", "Màu đỏ", "Màu tím", "Màu nâu"];


export default function SelectColor(props) {
  const { colors, setColors } = props;

  const handleOptionChange = (event, option) => {
    if (event.target.checked) {
      setColors([...colors, option]);
    } else {
      setColors(colors.filter((o) => o !== option));
    }
  };

  return (
    <Autocomplete
      multiple
      fullWidth
      // size='small'
      id="checkboxes-tags-demo"
      options={optionColors}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(prop, option, { selected }) => (
        <li {...prop}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            onChange={(event) => handleOptionChange(event, option)}
          />
          {option}
        </li>
      )}
      value={colors}
      onChange={(event, value) => setColors(value)}
      renderInput={(params) => (
        <TextField {...params} label="Color" placeholder="Color" />
      )}
    />
  );
}