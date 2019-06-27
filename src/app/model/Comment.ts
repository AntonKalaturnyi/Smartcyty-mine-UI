
export class Comment {
  id: number;
  description: string;
  userId: number;
  taskId: number;
  createdDate: string;
  updatedDate: string;
  userSeen:number[] = [];
  createName: string;
}
