import { Box } from "@mui/material";
import { getBackendUrl } from "getBackendUrl";

const UserImage = ({ image, size = "60px" }) => {
  const backendUrl = getBackendUrl();

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={
          image
            ? `${backendUrl}/assets/${image}`
            : "https://source.unsplash.com/random/?user"
        }
      />
    </Box>
  );
};

export default UserImage;
