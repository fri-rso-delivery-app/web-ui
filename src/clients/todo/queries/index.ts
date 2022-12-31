import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { HTTPValidationError } from "../requests/models/HTTPValidationError";
import { TaskCreate } from "../requests/models/TaskCreate";
import { TaskRead } from "../requests/models/TaskRead";
import { TaskUpdate } from "../requests/models/TaskUpdate";
import { UserRead } from "../requests/models/UserRead";
import { ValidationError } from "../requests/models/ValidationError";
import { DefaultService } from "../requests/services/DefaultService";
import { ExamplesService } from "../requests/services/ExamplesService";
import { TasksService } from "../requests/services/TasksService";
export const useDefaultServiceRootGetKey = "DefaultServiceRootGet";
export const useDefaultServiceRootGet = (queryKey: string[] = [], options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DefaultService.rootGet>>, unknown, Awaited<ReturnType<typeof DefaultService.rootGet>>, string[]>, "queryKey" | "queryFn" | "initialData">) => useQuery([useDefaultServiceRootGetKey, ...queryKey], () => DefaultService.rootGet(), options);
export const useDefaultServiceHealthHealthGetKey = "DefaultServiceHealthHealthGet";
export const useDefaultServiceHealthHealthGet = (queryKey: string[] = [], options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DefaultService.healthHealthGet>>, unknown, Awaited<ReturnType<typeof DefaultService.healthHealthGet>>, string[]>, "queryKey" | "queryFn" | "initialData">) => useQuery([useDefaultServiceHealthHealthGetKey, ...queryKey], () => DefaultService.healthHealthGet(), options);
export const useExamplesServiceListTasksExamplesWarningGetKey = "ExamplesServiceListTasksExamplesWarningGet";
export const useExamplesServiceListTasksExamplesWarningGet = (queryKey: string[] = [], options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ExamplesService.listTasksExamplesWarningGet>>, unknown, Awaited<ReturnType<typeof ExamplesService.listTasksExamplesWarningGet>>, string[]>, "queryKey" | "queryFn" | "initialData">) => useQuery([useExamplesServiceListTasksExamplesWarningGetKey, ...queryKey], () => ExamplesService.listTasksExamplesWarningGet(), options);
export const useExamplesServiceListTasksExamplesErrorGetKey = "ExamplesServiceListTasksExamplesErrorGet";
export const useExamplesServiceListTasksExamplesErrorGet = (queryKey: string[] = [], options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ExamplesService.listTasksExamplesErrorGet>>, unknown, Awaited<ReturnType<typeof ExamplesService.listTasksExamplesErrorGet>>, string[]>, "queryKey" | "queryFn" | "initialData">) => useQuery([useExamplesServiceListTasksExamplesErrorGetKey, ...queryKey], () => ExamplesService.listTasksExamplesErrorGet(), options);
export const useExamplesServiceListTasksExamplesExceptionGetKey = "ExamplesServiceListTasksExamplesExceptionGet";
export const useExamplesServiceListTasksExamplesExceptionGet = (queryKey: string[] = [], options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ExamplesService.listTasksExamplesExceptionGet>>, unknown, Awaited<ReturnType<typeof ExamplesService.listTasksExamplesExceptionGet>>, string[]>, "queryKey" | "queryFn" | "initialData">) => useQuery([useExamplesServiceListTasksExamplesExceptionGetKey, ...queryKey], () => ExamplesService.listTasksExamplesExceptionGet(), options);
export const useExamplesServiceListTasksExamplesUserDataGetKey = "ExamplesServiceListTasksExamplesUserDataGet";
export const useExamplesServiceListTasksExamplesUserDataGet = (queryKey: string[] = [], options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ExamplesService.listTasksExamplesUserDataGet>>, unknown, Awaited<ReturnType<typeof ExamplesService.listTasksExamplesUserDataGet>>, string[]>, "queryKey" | "queryFn" | "initialData">) => useQuery([useExamplesServiceListTasksExamplesUserDataGetKey, ...queryKey], () => ExamplesService.listTasksExamplesUserDataGet(), options);
export const useTasksServiceListTasksTasksGetKey = "TasksServiceListTasksTasksGet";
export const useTasksServiceListTasksTasksGet = (queryKey: string[] = [], options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof TasksService.listTasksTasksGet>>, unknown, Awaited<ReturnType<typeof TasksService.listTasksTasksGet>>, string[]>, "queryKey" | "queryFn" | "initialData">) => useQuery([useTasksServiceListTasksTasksGetKey, ...queryKey], () => TasksService.listTasksTasksGet(), options);
export const useTasksServiceCreateTaskTasksPost = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof TasksService.createTaskTasksPost>>, unknown, {
    requestBody: TaskCreate;
}, unknown>, "mutationFn">) => useMutation(({ requestBody }) => TasksService.createTaskTasksPost(requestBody), options);
export const useTasksServiceReadTaskTasksIdGetKey = "TasksServiceReadTaskTasksIdGet";
export const useTasksServiceReadTaskTasksIdGet = ({ id }: {
    id: string;
}, queryKey: string[] = [], options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof TasksService.readTaskTasksIdGet>>, unknown, Awaited<ReturnType<typeof TasksService.readTaskTasksIdGet>>, string[]>, "queryKey" | "queryFn" | "initialData">) => useQuery([useTasksServiceReadTaskTasksIdGetKey, ...queryKey], () => TasksService.readTaskTasksIdGet(id), options);
export const useTasksServiceDeleteTaskTasksIdDelete = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof TasksService.deleteTaskTasksIdDelete>>, unknown, {
    id: string;
}, unknown>, "mutationFn">) => useMutation(({ id }) => TasksService.deleteTaskTasksIdDelete(id), options);
export const useTasksServiceUpdateTaskTasksIdPatch = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof TasksService.updateTaskTasksIdPatch>>, unknown, {
    id: string;
    requestBody: TaskUpdate;
}, unknown>, "mutationFn">) => useMutation(({ id, requestBody }) => TasksService.updateTaskTasksIdPatch(id, requestBody), options);
