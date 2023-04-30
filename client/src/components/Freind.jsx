import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFreinds } from 'state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { useNavigate } from 'react-router-dom';

const Freind = ({ freindId, name, subtitle, userPicturePath, createdAt }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => {
    console.log(state.user);
    return state.user;
  });
  const token = useSelector((state) => state.token);
  const freinds = useSelector((state) => state.user.freinds);
  // console.log(state.user);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFreind =
    freinds.length > 0
      ? freinds.find((freind) => freind._id === freindId)
      : false;

  const patchFreind = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${freindId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    dispatch(setFreinds({ freinds: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={userPicturePath} size='55px' />
        <Box
          onClick={() => {
            navigate(`/profile/${freindId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant='h5'
            fontWeight='500'
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize='0.75rem'>
            {subtitle}
          </Typography>
          <Typography>
            {new Date(createdAt).toLocaleString(undefined, {
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </Typography>
        </Box>
      </FlexBetween>
      {!(_id === freindId) && (
        <IconButton
          onClick={() => patchFreind()}
          sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
        >
          {isFreind ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Freind;
