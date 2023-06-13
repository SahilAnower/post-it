import { Box, Typography, useTheme } from '@mui/material';
import Freind from 'components/Freind';
import WidgetWrapper from 'components/WidgetWrapper';
import { getBackendUrl } from 'getBackendUrl';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFreinds } from 'state';

const FreindListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const freinds = useSelector((state) => state.user.freinds);

  const backendUrl = getBackendUrl()

  const getFreinds = async () => {
    const response = await fetch(
      `${backendUrl}/users/${userId}/freinds`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFreinds({ freinds: data }));
  };

  useEffect(() => {
    getFreinds();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant='h5'
        fontWeight='500'
        sx={{ mb: '1.5rem' }}
      >
        Freind List
      </Typography>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        {freinds.map((freind) => (
          <Freind
            key={freind._id}
            freindId={freind._id}
            name={`${freind.firstName} ${freind.lastName}`}
            subtitle={freind.occupation}
            userPicturePath={freind.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FreindListWidget;
