import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private readonly ASSETS_ENDPOINT = 'http://localhost:8081';

  constructor(private readonly http: HttpClient) {}

  listCardInfo(category: string): Observable<CardInfo[]> {
    return this.http.get<ApiResponse>(`${this.ASSETS_ENDPOINT}/cardInfo/${category}.json`).pipe(
      map(res => {
        return res.cardInfoList.map(v => ({
          ...v,
          imgSrc: `${this.ASSETS_ENDPOINT}/images/${category}/${v.imgFileName}`,
          category: category,
        }))
      })
    );
  }
}

export type ApiResponseCardInfo = {
  no: string;
  lv: string;
  rarity: string;
  cardtype: string;
  parallel?: string;
  name: string;
  color: string;
  form: string;
  attribute: string;
  type: string;
  dp: string;
  apperanceCost: string;
  evolutionCost1: string;
  evolutionCost2: string;
  effect: string;
  evolutionaryOriginEffect: string;
  securityEffect: string;
  imgFileName: string;
};

export type ApiResponse = {
  cardInfoList: ApiResponseCardInfo[];
};

export type CardInfo = ApiResponseCardInfo & {
  imgSrc: string;
  category: string;
}