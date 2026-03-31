// Cloud function: sync
// push — upsert all user progress data to cloud
// pull — retrieve user progress data from cloud

const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const COLLECTION = 'user_data';

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const { action, data } = event;

  if (action === 'push') {
    const existing = await db.collection(COLLECTION).where({ openId: OPENID }).get();
    const record = { ...data, openId: OPENID, updatedAt: db.serverDate() };

    if (existing.data.length > 0) {
      await db.collection(COLLECTION).doc(existing.data[0]._id).update({ data: record });
    } else {
      record.createdAt = db.serverDate();
      await db.collection(COLLECTION).add({ data: record });
    }
    return { success: true };
  }

  if (action === 'pull') {
    const { data: docs } = await db.collection(COLLECTION).where({ openId: OPENID }).get();
    return { data: docs.length > 0 ? docs[0] : null };
  }

  return { error: 'unknown action' };
};
