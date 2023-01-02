/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** Packet */
export interface Packet {
  /** Delivery Destination */
  delivery_destination: string;
  /**
   * Store Id
   * @format uuid
   */
  store_id: string;
  /** Description */
  description?: string;
  /**
   *  Id
   * @format uuid
   */
  _id?: string;
  /**
   * Created
   * @format date-time
   */
  created?: string;
  /**
   * User Id
   * @format uuid
   */
  user_id: string;
}

/** PacketCreate */
export interface PacketCreate {
  /** Delivery Destination */
  delivery_destination: string;
  /**
   * Store Id
   * @format uuid
   */
  store_id: string;
  /** Description */
  description?: string;
}

/** PacketRead */
export interface PacketRead {
  /** Delivery Destination */
  delivery_destination: string;
  /**
   * Store Id
   * @format uuid
   */
  store_id: string;
  /** Description */
  description?: string;
  /**
   *  Id
   * @format uuid
   */
  _id: string;
  /**
   * Created
   * @format date-time
   */
  created: string;
}

/** StoreCreate */
export interface StoreCreate {
  /** Store Name */
  store_name: string;
  /** Location */
  location: string;
}

/** StoreRead */
export interface StoreRead {
  /** Store Name */
  store_name: string;
  /** Location */
  location: string;
  /**
   *  Id
   * @format uuid
   */
  _id: string;
  /**
   * Created
   * @format date-time
   */
  created: string;
}

/** StoreUpdate */
export type StoreUpdate = object;

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: any[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/api/v1/packets";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title packet microservice
 * @version 0.1.0
 * @baseUrl /api/v1/packets
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name RootGet
   * @summary Root
   * @request GET:/
   */
  rootGet = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  stores = {
    /**
     * No description
     *
     * @tags stores
     * @name ListStoresStoresGet
     * @summary List Stores
     * @request GET:/stores/
     * @secure
     */
    listStoresStoresGet: (params: RequestParams = {}) =>
      this.request<StoreRead[], HTTPValidationError>({
        path: `/stores/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stores
     * @name CreateStoreStoresPost
     * @summary Create Store
     * @request POST:/stores/
     * @secure
     */
    createStoreStoresPost: (data: StoreCreate, params: RequestParams = {}) =>
      this.request<StoreRead, HTTPValidationError>({
        path: `/stores/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stores
     * @name ReadStoreStoresIdGet
     * @summary Read Store
     * @request GET:/stores/{id}
     * @secure
     */
    readStoreStoresIdGet: (id: any, params: RequestParams = {}) =>
      this.request<StoreRead, HTTPValidationError>({
        path: `/stores/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stores
     * @name DeleteStoreStoresIdDelete
     * @summary Delete Store
     * @request DELETE:/stores/{id}
     * @secure
     */
    deleteStoreStoresIdDelete: (id: any, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/stores/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stores
     * @name UpdateStoreStoresIdPatch
     * @summary Update Store
     * @request PATCH:/stores/{id}
     * @secure
     */
    updateStoreStoresIdPatch: (id: any, data: StoreUpdate, params: RequestParams = {}) =>
      this.request<StoreRead, HTTPValidationError>({
        path: `/stores/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  packets = {
    /**
     * No description
     *
     * @tags packets
     * @name ListPacketsPacketsGet
     * @summary List Packets
     * @request GET:/packets/
     * @secure
     */
    listPacketsPacketsGet: (params: RequestParams = {}) =>
      this.request<PacketRead[], HTTPValidationError>({
        path: `/packets/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags packets
     * @name CreatePacketPacketsPost
     * @summary Create Packet
     * @request POST:/packets/
     * @secure
     */
    createPacketPacketsPost: (data: PacketCreate, params: RequestParams = {}) =>
      this.request<Packet, HTTPValidationError>({
        path: `/packets/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags packets
     * @name RequestRoutePacketsRequestRouteGet
     * @summary Request Route
     * @request GET:/packets/request_route
     * @secure
     */
    requestRoutePacketsRequestRouteGet: (
      query: {
        /**
         * Store Id
         * @format uuid
         */
        store_id: string;
        /** Time In Minutes */
        time_in_minutes: number;
        /**
         * Mode
         * @default "driving"
         */
        mode?: "driving" | "walking" | "bicycling" | "transit";
      },
      params: RequestParams = {},
    ) =>
      this.request<PacketRead[], HTTPValidationError>({
        path: `/packets/request_route`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags packets
     * @name ReadPacketPacketsIdGet
     * @summary Read Packet
     * @request GET:/packets/{id}
     * @secure
     */
    readPacketPacketsIdGet: (id: any, params: RequestParams = {}) =>
      this.request<PacketRead, HTTPValidationError>({
        path: `/packets/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags packets
     * @name DeletePacketPacketsIdDelete
     * @summary Delete Packet
     * @request DELETE:/packets/{id}
     * @secure
     */
    deletePacketPacketsIdDelete: (id: any, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/packets/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  health = {
    /**
     * No description
     *
     * @name HealthHealthGet
     * @summary Health
     * @request GET:/health
     */
    healthHealthGet: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/health`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
