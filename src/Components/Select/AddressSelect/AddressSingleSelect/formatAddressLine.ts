import { TGeocoderSuggestion } from "API/Types/Geocoder/geocoder";

export const formatAddressLine = (suggestion: TGeocoderSuggestion): string => {
  let address = "";
  if (suggestion.address.street) {
    address = address.concat(suggestion.address.street);
  }
  if (suggestion.address.houseNumber) {
    address = address.concat(` ${suggestion.address.houseNumber}`);
  }
  if (suggestion.address.postalCode) {
    address = address.concat(
      `${address ? ", " : ""}`,
      suggestion.address.postalCode
    );
  }
  if (suggestion.address.city) {
    address = address.concat(`${address ? ", " : ""}`, suggestion.address.city);
  }
  if (!suggestion.address.city && suggestion.address.county) {
    address = address.concat(
      `${address ? ", " : ""}`,
      suggestion.address.county
    );
  }
  if (!suggestion.address.city && suggestion.address.state) {
    address = address.concat(
      `${address ? ", " : ""}`,
      suggestion.address.state
    );
  }
  if (suggestion.address.country) {
    address = address.concat(
      `${address ? ", " : ""}`,
      suggestion.address.country
    );
  }

  return address;
};
