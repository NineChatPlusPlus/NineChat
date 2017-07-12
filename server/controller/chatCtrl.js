const Message = require('../model/message');
const User = require('../model/users');

const chatCtrl = {

  addMsg(data, callback) {
    return new Promise((resolve, reject) => {
      const message = new Message(JSON.parse(data));
      console.log('message is', message);
      message.save((err, savedMessage) => {
        if (err) reject(err);
        resolve(savedMessage);
      });
    });
  },

  getLastTen(userid, callback){
    Message.
      find({}).
      sort({timestamp: -1}).
      limit(10).
      exec((err, result)=>{
        console.log('err', err)
        return callback(err, result)
    })
  },

  //   get(req, res, next) {
  //   return new Promise((resolve, reject) => {
  //     Message.find({}, (err, messages) => {
  //       if (err) res.status(418).send(err);
  //       res.json(messages);
  //       next();
  //     });
  //   });
  // },

  get(req, res, next){
    Message.find({}, (err, messages) => {
      if (err) res.status(418).send(err);
      res.json(messages);
    });
  }
};

module.exports = chatCtrl
