export enum boardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}


export interface Board {
  id: string;
  title: string;
  description: string;
  status: boardStatus;
}