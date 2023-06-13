import { Box, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from 'scenes/navbar';
import UserWidget from 'scenes/widgets/UserWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import { useEffect } from 'react';
import { setFreinds } from 'state';
import AdvertWidget from 'scenes/widgets/AdvertWidget';
import FreindListWidget from 'scenes/widgets/FreindListWidget';
import { getBackendUrl } from 'getBackendUrl';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id, picturePath } = useSelector((state) => state.user);
  const freinds = useSelector((state) => state.user.freinds);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const backendUrl = getBackendUrl();

  useEffect(() => {
    const freindListDepict = async () => {
      const response = await fetch(`${backendUrl}/users/${_id}/freinds`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(setFreinds({ freinds: data }));
    };
    freindListDepict();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis='26%'>
            <AdvertWidget />
            <Box m='2rem 0' />
            <FreindListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
