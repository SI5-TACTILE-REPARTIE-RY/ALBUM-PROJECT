export const CurrentSession: Session = {
  users: 0,
  started: false,
  currentPhotoName: null,
  currentFilterName: 'noFilter',
  photoKept: null,
  cropperOwnerId: null,
  cropperPosition: null,
};

export interface Session {
  users: number;
  started: boolean;
  currentPhotoName: string;
  currentFilterName: string;
  photoKept: boolean;
  cropperOwnerId: string;
  cropperPosition: any;
}
