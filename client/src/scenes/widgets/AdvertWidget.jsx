import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';
import { getBackendUrl } from 'getBackendUrl';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const backendUrl = getBackendUrl()

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant='h5' fontWeight='500'>
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width='100%'
        height='auto'
        alt='advert'
        src={`${backendUrl}/assets/info4.jpg`}
        style={{
          borderRadius: '0.75rem',
          margin: '0.75rem 0',
        }}
      />
      <FlexBetween>
        <Typography color={main}>Postit - Sponsored</Typography>
        <Typography color={medium}>🔗postit.com</Typography>
      </FlexBetween>
      <Typography color={medium} m='0.5rem 0'>
        Your pathway to socialize all your code minds.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
