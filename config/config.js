exports.dbSettings = {
  //mongoUrl: 'mongodb://localhost:27017/mongotestdb'
  mongoUrl: process.env.DB_CONNECTION || 'mongodb+srv://revu:revu123@cluster0-lloom.mongodb.net/test?retryWrites=true&w=majority'
};

exports.serverSettings = {
  port: process.env.PORT || 3000
};

exports.security = {
  secretKey: '12345-67890-09876-54321',
  facebook: {
      clientId: '1034092406940238',
      clientSecret: '883af7b00c8352e75df6a05d366dce99'
    }
};
