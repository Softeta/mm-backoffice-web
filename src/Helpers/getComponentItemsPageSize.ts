const getComponentItemsPageSize = (): number => {
  if (process.env.REACT_APP_COMPONENT_ITEMS_PAGE_SIZE) {
    return +process.env.REACT_APP_COMPONENT_ITEMS_PAGE_SIZE;
  }
  return 0;
};

export default getComponentItemsPageSize;
