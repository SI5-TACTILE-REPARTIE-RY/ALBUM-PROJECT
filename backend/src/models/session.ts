export const CurrentSession: Session = {
  users: [],
  started: false,
  currentPhotoName: null,
  currentFilterName: 'noFilter',
  photoKept: null,
  cropperOwnerId: null,
  cropperPosition: null,
};

export interface Session {
  users: string[];
  started: boolean;
  currentPhotoName: string;
  currentFilterName: string;
  photoKept: boolean;
  cropperOwnerId: string;
  cropperPosition: any;
}
