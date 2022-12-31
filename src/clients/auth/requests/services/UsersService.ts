/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCreate } from '../models/UserCreate';
import type { UserRead } from '../models/UserRead';
import type { UserUpdate } from '../models/UserUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Register User
     * @param password
     * @param requestBody
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static registerUserUsersRegisterPost(
        password: string,
        requestBody: UserCreate,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/register',
            query: {
                'password': password,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read User
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static readUserUsersMyProfileGet(): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/my_profile',
        });
    }

    /**
     * Delete User
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteUserUsersMyProfileDelete(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/my_profile',
        });
    }

    /**
     * Update User
     * @param requestBody
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static updateUserUsersMyProfilePatch(
        requestBody: UserUpdate,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/my_profile',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
