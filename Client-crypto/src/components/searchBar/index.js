import TextField from "@mui/material/TextField";
const SearchBar = ({ change }) => {
  return (
    <div>
      <TextField
        onChange={change}
        id="filled-simple-start-adornment"
        variant="filled"
        label="With filled TextField"
        sx={{
          width: 320,
          marginBottom: 7,
          color: "white",
          "& .MuiFilledInput-input": {
            backgroundColor: "white",
            color: "red",
          },
          "& .MuiInputBase-input-MuiFilledInput-input": {
            borderBottomColor: "red",
            borderBottom: 10,
          },
        }}
      />
    </div>
  );
};
export default SearchBar;
