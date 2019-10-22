const BL_URL = '/api/';

export default {

   delete: function (id) {
      const requestUrl = BL_URL + 'messages/' + id;

      const requestOptions = {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json'
         }
      };

      return new Promise((resolve, reject) => {
         fetch(requestUrl, requestOptions)
            .then(res => {
               if (res.ok) {
                  console.log('Message deleted successfully');
                  resolve();
               } else {
                  console.log('Couldn\'t delete message');
                  reject();
               }
            })
            .catch(err => {
               console.log(err);
            });
      });
   },

   deleteAll: function () {
      const requestUrl = BL_URL + 'messages';

      const requestOptions = {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json'
         }
      };

      return new Promise((resolve, reject) => {
         fetch(requestUrl, requestOptions)
            .then(res => {
               if (res.ok) {
                  console.log('Messages deleted successfully');
                  resolve();
               } else {
                  console.log('Couldn\'t delete messages');
                  reject();
               }
            })
            .catch(err => {
               console.log(err);
            });
      });
   },

   edit: function (id, text) {
      const requestUrl = BL_URL + 'messages/' + id;

      const requestOptions = {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            'description': text
         })
      };

      return new Promise((resolve, reject) => {
         fetch(requestUrl, requestOptions)
            .then(res => {
               if (res.ok) {
                  console.log('Message updated successfully');
                  resolve();
               } else {
                  console.log('Couldn\'t update message');
                  reject();
               }
            })
            .catch(err => {
               console.log(err);
            });
      });
   },

   getAll: function () {
      let options = {
         method: 'GET',
         credentials: 'include',
         headers: {
            'cache-control': 'no-cache'
         }
      };

      return new Promise((resolve, reject) => {
         fetch(BL_URL + 'messages', options)
            .then(res => res.json())
            .then(messages => {
               resolve(messages);
            })
            .catch(err => {
               console.log('Couldn\'t load messages');
               console.log(err);
               reject();
            })
      });
   },

   add: function (text) {
      let options = {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            'description': text
         })
      };

      return new Promise((resolve, reject) => {
         fetch(BL_URL + 'messages', options)
            .then(res => res.json())
            .then(message => {
               console.log('Message added successfully');
               console.log(message);
               resolve();
            })
            .catch(err => {
               console.log(err);
               reject();
            })
      });
   }
}