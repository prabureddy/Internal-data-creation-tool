import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import PersonIcon from "@mui/icons-material/Person";
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
      <Flex sx={{ gap: "10px" }}>
        <Typography variant="p">Built by Bhargava Prabu Reddy</Typography>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/prabureddy/"
          rel="noreferrer"
        >
          <abbr title="LinkedIn">
            <LinkedInIcon />
          </abbr>
        </a>
        <a
          target="_blank"
          href="https://github.com/prabureddy/"
          rel="noreferrer"
        >
          <abbr title="Github">
            <GitHubIcon />
          </abbr>
        </a>
        <a target="_blank" href="https://prabureddy.com" rel="noreferrer">
          <abbr title="Portfolio - Personal Website">
            <PersonIcon />
          </abbr>
        </a>
      </Flex>
    </Flex>
  );
};

export default App;
