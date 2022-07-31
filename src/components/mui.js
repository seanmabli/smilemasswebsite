import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ReadMyStoryButton = styled(Button)({
  color: "#ffffff",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  lineHeight: 1.5,
  backgroundColor: "#547c94",
  "&:hover": {
    backgroundColor: "#547c94",
  },
});

export const NavButton = styled(Button)({
  color: "#547c94",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  lineHeight: 1.5,
  backgroundColor: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

export const ColoredTextFeild = styled(TextField)({
  '& label.Mui-focused': {
    color: '#547c94',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#547c94',
    },
  },
});
