type TypeMessageDetail = {
  token: string;
  riskId: number;
};

// Message domain interface
interface IMessageDomain {
  text: string;
  sender: string;
  room: string;
  topScore: TypeMessageDetail;
  details: TypeMessageDetail[];
}

// Message domain class
class MessageDomain implements IMessageDomain {
  text: string;
  sender: string;
  room: string;
  topScore: TypeMessageDetail;
  details: TypeMessageDetail[];

  constructor(
    text: string,
    sender: string,
    room: string,
    topScore: TypeMessageDetail,
    details: TypeMessageDetail[]
  ) {
    this.text = text;
    this.sender = sender;
    this.room = room;
    this.topScore = topScore;
    this.details = details;
  }
}

export { IMessageDomain, MessageDomain, TypeMessageDetail };
