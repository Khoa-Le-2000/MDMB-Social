import userApi from 'apis/userApi';
import { listRelationShipActionTypes } from 'app/actions/types/listRelationshipTypes';

const getListRelationshipStart = () => {
  return {
    type: listRelationShipActionTypes.GET_LIST_RELATIONSHIP_START,
  };
};

const getListRelationshipSuccess = (urlInfor) => {
  return {
    type: listRelationShipActionTypes.GET_LIST_RELATIONSHIP_SUCCESS,
    payload: urlInfor,
  };
};

const getListRelationshipFailure = (message) => {
  return {
    type: listRelationShipActionTypes.GET_LIST_RELATIONSHIP_FAILURE,
    payload: message,
  };
};

export const getListRelationship = (url) => async (dispatch) => {
  dispatch(getListRelationshipStart());
  const data = await userApi.getListRelationship(url);
  if (data?.result) {
    dispatch(
      getListRelationshipSuccess(
        data?.result
      )
    );
  } else {
    dispatch(getListRelationshipFailure('Cannot get list relationship!'));
  }
};
