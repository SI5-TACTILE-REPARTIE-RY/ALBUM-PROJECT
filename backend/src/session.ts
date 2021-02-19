export const CurrentSession: Session = {
  users: 0,
  started: false,
  currentPhotoName: null,
  currentFilterName: 'noFilter',
  photoKept: null,
  test: null,
};

export interface Session {
  users: number;
  started: boolean;
  currentPhotoName: string;
  currentFilterName: string;
  photoKept: boolean;
  test: string;
}
