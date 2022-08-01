import { Button, TextField, CardActionArea } from "@mui/material";
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

export const NewsItemCardActionArea = styled(CardActionArea)({
  color: "#547c94",
  maxWidth: "300px",
  padding: "10px",
  margin: "10px",
  border: "1px solid #547c94",
  textAlign: "center",
  borderRadius: "5px",
});

export const SMILEBlogCardActionArea = styled(CardActionArea)({
  color: "#547c94",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #547c94",
  borderRadius: "5px",
});