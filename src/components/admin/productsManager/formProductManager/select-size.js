import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;;

const optionSizes = [
  , "freeSize"
  , "Size_S (41kg - 47kg)"
  , "Size_M (48kg - 55kg)"
  , "Size_L (56kg - 65kg)"
  , "Size_1 (5kg - 7kg)"
  , "Size_2 (	7kg - 8kg)"
  , "Size_3 (8kg - 10kg)"
  , "Size_4 (10kg - 12kg)"
  , "Size_5 (	12kg - 14kg)"
  , "Size_6 (14kg - 15kg)"
  , "Size_7 (15kg - 17kg)"
  , "Size_8 (17kg - 19kg)"
  , "Size_9 (19kg - 20kg)"
  , "Size_10 (20kg - 22kg)"
  , "Size_11 (22kg - 24kg)"
  , "Size_12 (25kg - 27kg)"
  , "Size_13 (27kg - 30kg)"
  , "Size_14 (30kg - 33kg)"
  , "Size_15 (34kg - 36kg)"
  , "Size_16 (37kg - 40kg)"
];


export default function SelectSize(props) {
  const { sizes, setSizes } = props;

  const handleOptionChange = (event, option) => {
    if (event.target.checked) {
      setSizes([...sizes, option]);
    } else {
      setSizes(sizes.filter((o) => o !== option));
    }
  };

  return (
    <Autocomplete
      multiple
      fullWidth
      // sizes='small'
      id="checkboxes-tags-demo"
      options={optionSizes}
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
      value={sizes}
      onChange={(event, value) => setSizes(value)}
      renderInput={(params) => (
        <TextField {...params} label="Size" placeholder="Size" />
      )}
    />
  );
}


