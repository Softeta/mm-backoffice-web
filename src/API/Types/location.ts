export type TLocationResponse = {
  data: TLocation;
};

export type TLocationCoordinates = {
  longitude: number;
  latitude: number;
  addressLine: string;
};

export type TLocation = TLocationCoordinates & {
  country?: string;
  city?: string;
  postalCode?: string;
};
