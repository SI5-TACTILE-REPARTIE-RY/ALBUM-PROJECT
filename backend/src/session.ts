export const CurrentSession: Session = {
  users: 0,
  started: false,
  currentPhotoName: null,
  currentFilterName: 'noFilter',
};

export interface Session {
  users: number;
  started: boolean;
  currentPhotoName: string;
  currentFilterName: string;
}
