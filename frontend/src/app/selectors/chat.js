export const getRoomId = (state) => state?.chat?.roomId;
export const getListMessageLatest = (state) => state?.chat?.listMessage;

export const getPartner = (state) => state?.chat?.partner;

export const getSeenLatest = (state) => {
  const listMessage = getListMessageLatest(state);

  if (listMessage.length > 0) {
    const listMessageSeen = listMessage?.filter((item) => {
      return item.SeenDate;
    });
    return listMessageSeen[listMessageSeen.length - 1];
  }
  return null;
};

export const getLengthNewMessage = (accountId) => (state) => {
  const listMessage = getListMessageLatest(state);
  const listMessageSeen = listMessage?.filter((item) =>
    item.SeenDate ? true : false
  );
  return listMessage?.length - listMessageSeen?.length;
};
