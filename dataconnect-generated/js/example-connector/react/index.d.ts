import { CreateUserData, ListPublicMovieListsData, GetMyWatchesData, AddMovieToListData, AddMovieToListVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useListPublicMovieLists(options?: useDataConnectQueryOptions<ListPublicMovieListsData>): UseDataConnectQueryResult<ListPublicMovieListsData, undefined>;
export function useListPublicMovieLists(dc: DataConnect, options?: useDataConnectQueryOptions<ListPublicMovieListsData>): UseDataConnectQueryResult<ListPublicMovieListsData, undefined>;

export function useGetMyWatches(options?: useDataConnectQueryOptions<GetMyWatchesData>): UseDataConnectQueryResult<GetMyWatchesData, undefined>;
export function useGetMyWatches(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyWatchesData>): UseDataConnectQueryResult<GetMyWatchesData, undefined>;

export function useAddMovieToList(options?: useDataConnectMutationOptions<AddMovieToListData, FirebaseError, AddMovieToListVariables>): UseDataConnectMutationResult<AddMovieToListData, AddMovieToListVariables>;
export function useAddMovieToList(dc: DataConnect, options?: useDataConnectMutationOptions<AddMovieToListData, FirebaseError, AddMovieToListVariables>): UseDataConnectMutationResult<AddMovieToListData, AddMovieToListVariables>;
