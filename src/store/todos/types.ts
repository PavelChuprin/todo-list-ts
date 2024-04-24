export interface ITodo {
  id: string;
  title: string;
  description: string;
  complete: boolean;
}

export interface TodoSliceState {
  items: ITodo[];
}
