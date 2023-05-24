// interface import
import db from '../infraestructure/database/db';
// model import
import MessageModel from './message/message.model';

// map models to db session
db.addModels([MessageModel]);

export {MessageModel};
