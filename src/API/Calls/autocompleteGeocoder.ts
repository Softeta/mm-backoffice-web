import { autocompleteGeocoderHttpClient } from "API/clients";
import { TGeocoderSuggestionsResponse } from "API/Types/Geocoder/geocoder";
import { useQuery } from "react-query";

export enum GeocoderSuggestionsQueryKeys {
  geocodeSearch = "geocode-search",
}

export const fetchGeocoderSuggestions = async (
  search: string,
  isResultTypeCity: boolean
): Promise<TGeocoderSuggestionsResponse> => {
  const searchQuery = search
    ? `?query=${search}${isResultTypeCity ? "&resultType=city" : ""}`
    : "";
  return autocompleteGeocoderHttpClient.get(`/6.2/suggest.json${searchQuery}`);
};

export const useGeocoderSuggestions = (
  search: string = "",
  isResultTypeCity: boolean = false
) =>
  useQuery(
    `${GeocoderSuggestionsQueryKeys.geocodeSearch}.${search}`,
    () => fetchGeocoderSuggestions(search, isResultTypeCity),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
