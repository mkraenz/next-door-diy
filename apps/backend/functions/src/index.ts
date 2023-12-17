import * as logger from 'firebase-functions/logger';
import { defineList, defineString } from 'firebase-functions/params';
import { HttpsError, onCall, onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2/options';

const region = defineList('REGIONS', {
  default: ['europe-west1'],
});

setGlobalOptions({
  // https://github.com/firebase/firebase-tools/pull/6205
  region: region as unknown as string,
});

const authorizedUserIdsCsv = defineString('AUTHORIZED_ADMIN_USER_IDS_CSV');
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const isAdminUser = (uid: string) => {
  // .value() must be called within a firebase function to avoid calling it at deploy time. It needs to be at function runtime.
  const authorizedUserIds = authorizedUserIdsCsv.value().split(',');
  logger.debug('authorizedUserIds', authorizedUserIds);
  return authorizedUserIds.includes(uid);
};

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

export const createSubscription = onCall(async (request) => {
  const uid = request.auth?.uid;
  logger.debug('called by uid:', uid);
  if (!uid) throw new HttpsError('unauthenticated', 'Unauthenticated');
  if (!isAdminUser(uid))
    throw new HttpsError('permission-denied', 'Unauthorized');

  return {
    success: true,
  };

  // const db = getDatabase(getApp());
  // await db.ref('/subscriptions/').push({
  //   name: 'test',
  //   price: 1000,
  //   createdAt: new Date().toISOString(),
  //   status: 'active',
  // });
});
