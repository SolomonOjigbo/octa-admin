import { Location } from 'react-router-dom';

/**
 * This refers to the location state type used in the application
 * it can be extended as need be
 */
interface LocationState {
  from?: string;
}

/** This refers to the useLocation custom type */
export interface AppLocationState extends Location {
  state: LocationState;
}
