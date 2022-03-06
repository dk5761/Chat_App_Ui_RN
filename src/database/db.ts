import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

enablePromise(true);

export const getDatabase = async () => {
  let db = await openDatabase({name: 'alpha.db', location: 'default'});
  return db;
};

interface chatListItem {
  id: string;
  username: string;
  email: string;

  time: string;

  profileImageUrl: string;
  deviceToken: string;
}

export const createTable = async () => {
  try {
    const db = await getDatabase();
    const query =
      'CREATE TABLE IF NOT EXISTS chatList (id String PRIMARY KEY, username TEXT, email TEXT,  time TEXT,  profileImageUrl TEXT, deviceToken TEXT)';
    await db.executeSql(query);
  } catch (err) {}
};

export const getChatList = async () => {
  try {
    const db = await getDatabase();

    const chatList = [];

    const query = 'Select * from chatList';
    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        chatList.push(result.rows.item(index));
      }
    });

    return results;
  } catch (err) {
    console.error(err);
    throw Error('Failed to get chatList !!!');
  }
};

export const addUser = async (data: chatListItem) => {
  try {
    const db = await getDatabase();

    const chatList = [];
    const query =
      `insert into chatList (id, username, email, time, profileImageUrl, deviceToken)
        Select ` +
      ` ${data.id}, ${data.username}, ${data.email}, ${data.time}, ${data.profileImageUrl}, ${data.deviceToken} Where not exists(select * from chatList where id= ${data.id})`;
    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        chatList.push(result.rows.item(index));
      }
    });

    return results;
  } catch (err) {
    console.error(err);
    throw Error('Failed to get chatList !!!');
  }
};

export const deleteUser = async (id: string) => {
  try {
    const db = await getDatabase();
    const query = `DELETE FROM chatList WHERE id=${id}`;
    const results = await db.executeSql(query);

    return results;
  } catch (err) {
    console.error(err);
    throw Error('Failed to get chatList !!!');
  }
};

export const checkUser = async (id: string, callback: any) => {
  try {
    const db = await getDatabase();
    const query = `SELECT * FROM chatList WHERE id=${id}`;
    const results = await db.executeSql(query);

    return results;
  } catch (err) {
    console.error(err);
    throw Error('Failed to get chatList !!!');
  }
};

export const deleteChatList = async () => {
  try {
    const db = await getDatabase();
    const query = `DELETE FROM chatList`;
    const results = await db.executeSql(query);

    return results;
  } catch (err) {
    console.error(err);
    throw Error('Failed to get chatList !!!');
  }
};
