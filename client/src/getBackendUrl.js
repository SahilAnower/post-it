export const getBackendUrl = () => {
  // console.log('process.env.REACT_APP', process.env.REACT_APP_BACKEND_DEV);
  return process.env.REACT_APP_IS_PROD === 'true'
    ? process.env.REACT_APP_BACKEND_PROD
    : process.env.REACT_APP_BACKEND_DEV;
};
