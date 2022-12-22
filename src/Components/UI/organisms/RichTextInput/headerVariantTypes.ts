enum HeaderVariantType {
  h1 = "header-one",
  h2 = "header-two",
  h3 = "header-three",
  normal = "unstyled",
}

export const stringToHeaderVariant = (value: string): HeaderVariantType => {
  switch (value) {
    case "header-one":
      return HeaderVariantType.h1;
    case "header-two":
      return HeaderVariantType.h2;
    case "header-three":
      return HeaderVariantType.h3;
    default:
      return HeaderVariantType.normal;
  }
};

export default HeaderVariantType;
