export type TGeocoderSuggestionsResponse = {
  data: {
    suggestions: TGeocoderSuggestion[];
  };
};

export type TGeocoderSuggestion = {
  label: string;
  address: TGeocoderAddress;
  countryCode: string;
  language: string;
  locationId: string;
  matchLevel: string;
};

export type TGeocoderAddress = {
  country: string;
  state: string;
  county: string;
  city: string;
  postalCode: string;
  street?: string;
  houseNumber?: string;
};
