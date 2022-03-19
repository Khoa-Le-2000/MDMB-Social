import userApi from 'apis/userApi';
import { partnerProfileActionTypes } from 'app/actions/types/partnerProfileTypes';

const getPartnerProfileStart = () => {
  return {
    type: partnerProfileActionTypes.PARTNER_PROFILE_START,
  };
};

const getPartnerProfileSuccess = (UserProfile) => {

  return {
    type: partnerProfileActionTypes.PARTNER_PROFILE_SUCCESS,
    payload: UserProfile,
  };
};

const getPartnerProfileFailure = (message) => {
  return {
    type: partnerProfileActionTypes.PARTNER_PROFILE_FAILURE,
    payload: message,
  };
};

export const getPartnerProfile = (myAccountId) => async (dispatch) => {
  dispatch(getPartnerProfileStart());
  const data = await userApi.getPartnerAccountInfor(myAccountId);
  if (data?.result) {
    dispatch(
      getPartnerProfileSuccess(
         data?.result
      )
    );
  } else {
    dispatch(getPartnerProfileFailure('Cannot get User Profile!'));
  }
};
