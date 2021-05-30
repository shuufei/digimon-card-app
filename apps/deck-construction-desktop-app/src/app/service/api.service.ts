import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Color, COLOR } from '../types';

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
          color: this.convertColor(v.color)
        }))
      })
    );
  }

  private convertColor(color: ApiResponseColor): Color {
    switch (color) {
      case 'red':
        return COLOR['1_red'];
      case 'blue':
        return COLOR['2_blue'];
      case 'yellow':
        return COLOR['3_yellow'];
      case 'green':
        return COLOR['4_green'];
      case 'black':
        return COLOR['5_black'];
      case 'purple':
        return COLOR['6_purple'];
      case 'white':
        return COLOR['7_white'];
    }
  }
}

export type ApiResponseColor = 'red' | 'blue' | 'green' | 'yellow' | 'black' | 'purple' | 'white';

export type ApiResponseCardInfo = {
  no: string;
  lv: string;
  rarity: string;
  cardtype: string;
  parallel?: string;
  name: string;
  color: ApiResponseColor;
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

export type CardInfo = Omit<ApiResponseCardInfo, 'color'> & {
  imgSrc: string;
  category: string;
  color: Color;
}