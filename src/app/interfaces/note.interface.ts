export interface Note {
  author: string;
  note: string;
  startTime: number;
  endTime: number;
  attachment: string; // TODO: ability to add attachments to notes
}
