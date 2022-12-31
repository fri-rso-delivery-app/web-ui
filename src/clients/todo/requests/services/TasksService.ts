/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TaskCreate } from '../models/TaskCreate';
import type { TaskRead } from '../models/TaskRead';
import type { TaskUpdate } from '../models/TaskUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TasksService {

    /**
     * List Tasks
     * @returns TaskRead Successful Response
     * @throws ApiError
     */
    public static listTasksTasksGet(): CancelablePromise<Array<TaskRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/',
        });
    }

    /**
     * Create Task
     * @param requestBody
     * @returns TaskRead Successful Response
     * @throws ApiError
     */
    public static createTaskTasksPost(
        requestBody: TaskCreate,
    ): CancelablePromise<TaskRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Task
     * @param id
     * @returns TaskRead Successful Response
     * @throws ApiError
     */
    public static readTaskTasksIdGet(
        id: string,
    ): CancelablePromise<TaskRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Task
     * @param id
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteTaskTasksIdDelete(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Task
     * @param id
     * @param requestBody
     * @returns TaskRead Successful Response
     * @throws ApiError
     */
    public static updateTaskTasksIdPatch(
        id: string,
        requestBody: TaskUpdate,
    ): CancelablePromise<TaskRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/tasks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
