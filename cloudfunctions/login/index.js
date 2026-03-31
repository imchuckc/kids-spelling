// Cloud function: login
// Exchanges WeChat session for openId, upserts user record.

const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();

  const { data } = await db.collection('users').where({ openId: OPENID }).get();

  if (data.length === 0) {
    await db.collection('users').add({
      data: {
        openId: OPENID,
        nickName: event.nickName || '',
        avatarUrl: event.avatarUrl || '',
        createdAt: db.serverDate(),
      },
    });
    return { openId: OPENID, isNew: true };
  }

  // Update profile fields if provided
  if (event.nickName || event.avatarUrl) {
    const update = {};
    if (event.nickName) update.nickName = event.nickName;
    if (event.avatarUrl) update.avatarUrl = event.avatarUrl;
    await db.collection('users').doc(data[0]._id).update({ data: update });
  }

  return { openId: OPENID, isNew: false, user: data[0] };
};
