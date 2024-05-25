/*
 * message domain
 */

export type MessageDetail = {
  token: string;
  riskId: number;
};

// message domain interface
export interface IMessageDomain {
  text: string;
  sender: string;
  room: string;
  topScore: MessageDetail;
  details: MessageDetail[];
}

// message domain class
export class MessageDomain implements IMessageDomain {
  text: string;
  sender: string;
  room: string;
  topScore: MessageDetail;
  details: MessageDetail[];

  constructor(
    text: string,
    sender: string,
    room: string,
    topScore: MessageDetail,
    details: MessageDetail[]
  ) {
    this.text = text;
    this.sender = sender;
    this.room = room;
    this.topScore = topScore;
    this.details = details;
  }
}
