export interface TodoItem {
  id?: string;
  title: string;
  description?: string;
  assignedToId: string;
  dueDate: Date;
  progress?: number;
  ownerId?: string;
}
