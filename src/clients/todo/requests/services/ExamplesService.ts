/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRead } from '../models/UserRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ExamplesService {

    /**
     * List Tasks
     * @returns any Successful Response
     * @throws ApiError
     */
    public static listTasksExamplesWarningGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/examples/warning',
        });
    }

    /**
     * List Tasks
     * @returns any Successful Response
     * @throws ApiError
     */
    public static listTasksExamplesErrorGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/examples/error',
        });
    }

    /**
     * List Tasks
     * @returns any Successful Response
     * @throws ApiError
     */
    public static listTasksExamplesExceptionGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/examples/exception',
        });
    }

    /**
     * List Tasks
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static listTasksExamplesUserDataGet(): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/examples/user_data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
