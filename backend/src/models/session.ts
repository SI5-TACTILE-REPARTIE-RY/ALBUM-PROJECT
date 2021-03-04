export const CurrentSession: Session = {
  users: [],
  started: false,
  currentPhotoName: null,
  currentFilterName: 'noFilter',
  photoKept: null,
  cropperOwnerId: null,
  cropperPosition: null,
  photos: ['india-photo1.jpg', 'india-photo2.jpg', 'india-photo3.jpg', 'india-photo4.jpg']
};

export interface Session {
  users: string[];
  started: boolean;
  currentPhotoName: string;
  currentFilterName: string;
  photoKept: boolean;
  cropperOwnerId: string;
  cropperPosition: any;
  photos: string[];
}
