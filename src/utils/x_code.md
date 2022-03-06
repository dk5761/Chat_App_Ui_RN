      db.transaction(async (tx) => {
        tx.executeSql(
          `SELECT * from chatList WHERE id="${data.id}"`,
          undefined,
          (txObj, { rows: { _array } }) => {
            if (_array.length === 0) {
              console.log("inside 2");
              tx.executeSql(
                "INSERT INTO chatList (id, username, email, last_message, time, message_status, imageUrl) VALUES (?,?,?,?,?,?,?);",
                [
                  data.id,
                  data.username,
                  data.email,
                  data.last_message,
                  data.time,
                  data.message_status,
                  data.profileImageUrl,
                ],
                (tx, row) => {
                  console.log("success"),
                    (_txObj: any, error: any): boolean => {
                      console.log(error);
                      return false;
                    };
                }
              );
            }
          }
        );
      });
    },


      db.transaction((tx) => {
        tx.executeSql(
          `Select * from chatList`,
          undefined,
          (txObj, results) => {
            console.log(results);
            const list = results.rows._array;
            state.chatList = list;
          },
          (txObj, error): boolean => {
            console.log(error);
            return false;
          }
        );
      });
