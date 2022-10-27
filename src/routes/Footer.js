import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Footer(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000" style={{textDecorationLine: 'none', color: 'black', fontWeight: 'bold'}}>
          Tour Community
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default Footer;