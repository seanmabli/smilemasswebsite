import {
  Button,
  TextField,
  CardActionArea,
  Card,
  Tabs,
  Tab,
} from "@mui/material";
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
  "& label.Mui-focused": {
    color: "#547c94",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#547c94",
    },
  },
});

export const NewsItemCardActionArea = styled(CardActionArea)({
  color: "#547c94",
  maxWidth: "290px",
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
  maxWidth: "1250px",
  justifyContent: "left",
  display: "flex",
  ["@media (max-width:600px)"]: {
    display: "block",
  },
});

export const TittapCard = styled(Card)({
  color: "#547c94",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #547c94",
  borderRadius: "5px",
  maxWidth: "1250px",
});

export const OurTeamCard = styled(Card)({
  color: "#547c94",
  padding: "10px",
  margin: "10px",
  border: "1px solid #547c94",
  borderRadius: "5px",
  width: "300px",
});

export const EquipmentLoanerProgramCard = styled(Card)({
  color: "rgba(0, 0, 0, 0.6)",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "5px",
  boxShadow: "none",
  width: "248px",
  ["@media (max-width:810px)"]: {
    marginRight: "0",
    marginTop: "10px",
    width: "100%",
  },
});

export const AdminTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#547c94",
  },
});

export const AdminTab = styled(Tab)({
  textTransform: "none",
  color: "#547c94",
  "&.Mui-selected": {
    color: "#547c94",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#547c94",
  },
});
