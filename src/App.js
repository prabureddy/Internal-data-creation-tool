import Typography from "@mui/material/Typography";
import Table from "./Table";
import Flex from "./component/Flex";

const App = () => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        gap: "40px",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Internal Data Creation Tool</Typography>
      <Table />
      <Typography variant="p">Built by Bhargava Prabu Reddy</Typography>
    </Flex>
  );
};

export default App;
