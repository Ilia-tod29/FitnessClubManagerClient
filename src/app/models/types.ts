export type authParams = {
  email: string;
  password: string;
}

export type updateUserParams = {
  suspended: string;
}

export type createOrUpdateInventoryItem = {
  name: string;
  image: string;
}

export type createOrUpdateGalleryItem = {
  image: string;
}
