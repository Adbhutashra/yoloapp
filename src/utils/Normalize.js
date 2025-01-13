import {Dimensions, PixelRatio} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;

const normalize = size => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const responsiveWidth = widthPercent => {
  return wp(widthPercent);
};

export const responsiveHeight = heightPercent => {
  return hp(heightPercent);
};

export const responsiveFontSize = fontSizePercent => {
  return hp(fontSizePercent);
};

export default normalize;
