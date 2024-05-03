/* eslint-disable camelcase */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { lastValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ResponseType } from './response';


@Injectable()
export default class RestClientService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post(url: string, payload: object, config?: AxiosRequestConfig): Promise<any> {
    return lastValueFrom(this.httpService.post(url, payload, config).pipe(map((response) => response.data)));
  }

  async put(url: string, payload?: object, config?: AxiosRequestConfig): Promise<ResponseType> {
    return lastValueFrom(this.httpService.put(url, payload, config).pipe(map((response) => response.data)));
  }

  async get(url: string, config?: AxiosRequestConfig): Promise<ResponseType> {
    return lastValueFrom(this.httpService.get(url, config).pipe(map((response) => response.data)));
  }
}
