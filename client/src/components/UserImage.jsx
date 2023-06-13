import { Box } from '@mui/material';
import { getBackendUrl } from 'getBackendUrl';

const UserImage = ({ image, size = '60px' }) => {

  const backendUrl = getBackendUrl()

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt='user'
        src={`${backendUrl}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
