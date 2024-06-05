type TabParamList = {
  HomeTab: undefined;
  FavoritesTab: undefined;
};

type ScreenParamList = {
  Home: undefined;
  Detail: { id: string };
  Search: undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  Tab: undefined;
} & TabParamList &
  ScreenParamList;
