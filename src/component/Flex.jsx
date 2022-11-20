import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Container = styled(Box)`
  display: flex;
  justify-content: center;
`;

const Flex = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Flex;
