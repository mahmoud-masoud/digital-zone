const isMobileOrTablet =
  /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

export default isMobileOrTablet;
