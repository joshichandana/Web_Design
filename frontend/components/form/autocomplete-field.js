/**
 * Wrapper for Autocomplete component
 
 *
 * @module components/form/autocomplete-field
 * @requires @mui/material
 */


import { Autocomplete } from '@mui/material';

export default function HailAutocompleteField(props) {
  const { required = true } = props;

  return (
    <Autocomplete
      disableClearable={true}
      selectOnFocus={true}
      clearOnBlur={true}
      freeSolo={false}
      required={required}
      {...props}
    />
  );
}