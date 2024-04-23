// interface import
import db from '../infraestructure/database/db';
// model import
import MessageModel from './message/message.model';
import UserModel from './user/user.model';

// map models to db session
db.addModels([UserModel, MessageModel]);

export { MessageModel, UserModel };
