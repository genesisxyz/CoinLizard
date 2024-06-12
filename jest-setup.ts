// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';
// Import built-in Jest matchers
import '@testing-library/react-native/extend-expect';

import { configure } from '@testing-library/react-native';

configure({ asyncUtilTimeout: 20000 });

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
