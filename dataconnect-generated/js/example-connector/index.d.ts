import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddMovieToListData {
  movieListEntry_insert: MovieListEntry_Key;
}

export interface AddMovieToListVariables {
  movieListId: UUIDString;
  movieId: UUIDString;
  note?: string | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface GetMyWatchesData {
  watches: ({
    id: UUIDString;
    movie: {
      id: UUIDString;
      title: string;
    } & Movie_Key;
      watchDate: TimestampString;
      location?: string | null;
  } & Watch_Key)[];
}

export interface ListPublicMovieListsData {
  movieLists: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & MovieList_Key)[];
}

export interface MovieListEntry_Key {
  movieListId: UUIDString;
  position: number;
  __typename?: 'MovieListEntry_Key';
}

export interface MovieList_Key {
  id: UUIDString;
  __typename?: 'MovieList_Key';
}

export interface Movie_Key {
  id: UUIDString;
  __typename?: 'Movie_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Watch_Key {
  id: UUIDString;
  __typename?: 'Watch_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface ListPublicMovieListsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicMovieListsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPublicMovieListsData, undefined>;
  operationName: string;
}
export const listPublicMovieListsRef: ListPublicMovieListsRef;

export function listPublicMovieLists(): QueryPromise<ListPublicMovieListsData, undefined>;
export function listPublicMovieLists(dc: DataConnect): QueryPromise<ListPublicMovieListsData, undefined>;

interface GetMyWatchesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyWatchesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyWatchesData, undefined>;
  operationName: string;
}
export const getMyWatchesRef: GetMyWatchesRef;

export function getMyWatches(): QueryPromise<GetMyWatchesData, undefined>;
export function getMyWatches(dc: DataConnect): QueryPromise<GetMyWatchesData, undefined>;

interface AddMovieToListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddMovieToListVariables): MutationRef<AddMovieToListData, AddMovieToListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddMovieToListVariables): MutationRef<AddMovieToListData, AddMovieToListVariables>;
  operationName: string;
}
export const addMovieToListRef: AddMovieToListRef;

export function addMovieToList(vars: AddMovieToListVariables): MutationPromise<AddMovieToListData, AddMovieToListVariables>;
export function addMovieToList(dc: DataConnect, vars: AddMovieToListVariables): MutationPromise<AddMovieToListData, AddMovieToListVariables>;

