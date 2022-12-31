import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { Body_get_token_jwt_token_post } from "../requests/models/Body_get_token_jwt_token_post";
import { HTTPValidationError } from "../requests/models/HTTPValidationError";
import { JWToken } from "../requests/models/JWToken";
import { UserCreate } from "../requests/models/UserCreate";
import { UserRead } from "../requests/models/UserRead";
import { UserUpdate } from "../requests/models/UserUpdate";
import { ValidationError } from "../requests/models/ValidationError";
import { DefaultService } from "../requests/services/DefaultService";
import { JwtService } from "../requests/services/JwtService";
import { UsersService } from "../requests/services/UsersService";
export const useDefaultServiceRootGetKey = "DefaultServiceRootGet";
export const useDefaultServiceRootGet = (queryKey: string[] = [], options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DefaultService.rootGet>>, unknown, Awaited<ReturnType<typeof DefaultService.rootGet>>, string[]>, "queryKey" | "queryFn" | "initialData">) => useQuery([useDefaultServiceRootGetKey, ...queryKey], () => DefaultService.rootGet(), options);
export const useDefaultServiceHealthHealthGetKey = "DefaultServiceHealthHealthGet";
export const useDefaultServiceHealthHealthGet = (queryKey: string[] = [], options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DefaultService.healthHealthGet>>, unknown, Awaited<ReturnType<typeof DefaultService.healthHealthGet>>, string[]>, "queryKey" | "queryFn" | "initialData">) => useQuery([useDefaultServiceHealthHealthGetKey, ...queryKey], () => DefaultService.healthHealthGet(), options);
export const useJwtServiceGetTokenJwtTokenPost = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof JwtService.getTokenJwtTokenPost>>, unknown, {
    formData: Body_get_token_jwt_token_post;
}, unknown>, "mutationFn">) => useMutation(({ formData }) => JwtService.getTokenJwtTokenPost(formData), options);
export const useUsersServiceRegisterUserUsersRegisterPost = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.registerUserUsersRegisterPost>>, unknown, {
    password: string;
    requestBody: UserCreate;
}, unknown>, "mutationFn">) => useMutation(({ password, requestBody }) => UsersService.registerUserUsersRegisterPost(password, requestBody), options);
export const useUsersServiceReadUserUsersMyProfileGetKey = "UsersServiceReadUserUsersMyProfileGet";
export const useUsersServiceReadUserUsersMyProfileGet = (queryKey: string[] = [], options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UsersService.readUserUsersMyProfileGet>>, unknown, Awaited<ReturnType<typeof UsersService.readUserUsersMyProfileGet>>, string[]>, "queryKey" | "queryFn" | "initialData">) => useQuery([useUsersServiceReadUserUsersMyProfileGetKey, ...queryKey], () => UsersService.readUserUsersMyProfileGet(), options);
export const useUsersServiceDeleteUserUsersMyProfileDelete = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.deleteUserUsersMyProfileDelete>>, unknown, void, unknown>, "mutationFn">) => useMutation(() => UsersService.deleteUserUsersMyProfileDelete(), options);
export const useUsersServiceUpdateUserUsersMyProfilePatch = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.updateUserUsersMyProfilePatch>>, unknown, {
    requestBody: UserUpdate;
}, unknown>, "mutationFn">) => useMutation(({ requestBody }) => UsersService.updateUserUsersMyProfilePatch(requestBody), options);
