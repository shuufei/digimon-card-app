import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardType, Color, COLOR, Lv, Category } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private readonly ASSETS_ENDPOINT = 'http://localhost:8081';

  constructor(private readonly http: HttpClient) {}

  listAllCardInfo(): Observable<CardInfo[]> {
    const bt01Cards$ = this.listCardInfoByCategory('BT01');
    const bt02Cards$ = this.listCardInfoByCategory('BT02');
    const bt03Cards$ = this.listCardInfoByCategory('BT03');
    const bt04Cards$ = this.listCardInfoByCategory('BT04');
    const bt05Cards$ = this.listCardInfoByCategory('BT05');
    const bt06Cards$ = this.listCardInfoByCategory('BT06');
    const st01Cards$ = this.listCardInfoByCategory('ST01');
    const st02Cards$ = this.listCardInfoByCategory('ST02');
    const st03Cards$ = this.listCardInfoByCategory('ST03');
    const st04Cards$ = this.listCardInfoByCategory('ST04');
    const st05Cards$ = this.listCardInfoByCategory('ST05');
    const st06Cards$ = this.listCardInfoByCategory('ST06');
    const st07Cards$ = this.listCardInfoByCategory('ST07');
    const st08Cards$ = this.listCardInfoByCategory('ST08');
    return combineLatest([
      bt01Cards$,
      bt02Cards$,
      bt03Cards$,
      bt04Cards$,
      bt05Cards$,
      bt06Cards$,
      st01Cards$,
      st02Cards$,
      st03Cards$,
      st04Cards$,
      st05Cards$,
      st06Cards$,
      st07Cards$,
      st08Cards$,
    ]).pipe(
      map((response) => {
        return response.flat();
      })
    );
  }

  private listCardInfoByCategory(category: Category): Observable<CardInfo[]> {
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
  lv: Lv;
  rarity: string;
  cardtype: CardType;
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
  category: Category;
  color: Color;
}