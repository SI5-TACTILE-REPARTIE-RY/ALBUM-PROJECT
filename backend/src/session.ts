export const CurrentSession: Session = {
  users: 0,
  started: false,
  currentPhotoSrc: null,
  currentFilterName: 'noFilter',
};

export interface Session {
  users: number;
  started: boolean;
  currentPhotoSrc: string;
  currentFilterName: string;
}
