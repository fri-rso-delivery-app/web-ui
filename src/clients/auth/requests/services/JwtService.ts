/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_get_token_jwt_token_post } from '../models/Body_get_token_jwt_token_post';
import type { JWToken } from '../models/JWToken';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class JwtService {

    /**
     * Get Token
     * @param formData
     * @returns JWToken Successful Response
     * @throws ApiError
     */
    public static getTokenJwtTokenPost(
        formData: Body_get_token_jwt_token_post,
    ): CancelablePromise<JWToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/jwt/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
