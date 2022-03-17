export const getConversations = (state) =>
  state?.conversations?.listConversation;


export const getLengthMessageUnread= (accountId) => (state) => {
  const listConversation = getConversations(state);
  let length = 0;
  listConversation.forEach((item) => {
    if (item.AccountId !== accountId && item.IsRead === false) {
      length += 1;
    }
  });
  return length;
};
