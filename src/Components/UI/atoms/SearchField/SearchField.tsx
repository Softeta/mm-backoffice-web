import { TextField as MuiTextField, InputAdornment } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchField = ({ className, ...props }: TextFieldProps) => (
  <MuiTextField
    className={`input-search ${className ?? ""}`}
    variant="standard"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    {...props}
  />
);
export default SearchField;
