export enum ProductActionsTypes {
  GET_ALL_PRODUCTS = '[Product] Get All Products',
  GET_SELECTED_PRODUCTS = '[Product] Get selected Products',
  GET_AVAILABLE_PRODUCTS = '[Product] Get Available Products',
  SEARCH_PRODUCTS = '[Product] Search Products',
  NEW_PRODUCTS = '[Product] New Products',
  SELECT_PRODUCTS = '[Product] Select Products',
  EDIT_PRODUCTS = '[Product] Edit Products',
  DELETE_PRODUCTS = '[Product] Delete Products',
}

export interface ActionEvent {
  type: ProductActionsTypes;
  payload?: any; // LE payload ICI EST LE PARAMETRE DE L'EVENEMENT
}

export enum DataStateEnum {
  LOADING,
  LOADER,
  ERROR,
}

export interface AppDataState<T> {
  dataState?: DataStateEnum; // ETAT DES DONNES
  data?: T; // LES DONNEES QUE JE VEUX AFFICHER
  errorMessage?: string; // MESSSAGE POUR LES ERREURS
}
