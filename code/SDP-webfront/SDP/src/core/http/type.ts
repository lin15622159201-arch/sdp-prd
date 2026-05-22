import { IResponse } from '@toy/http2/dist/types';

export interface IPromise<T = any> extends Promise<IResponse<T>> {}
