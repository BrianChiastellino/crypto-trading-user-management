import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Wallet } from '../../models/wallet/wallet.models';
import { Observable, catchError, map, of, pipe, switchMap, tap, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})

export class WalletService {

  private baseUrl: string = environment.urlBaseJsonServer;
  private readonly urlBackend : string = environment.urlBackend;


  constructor(private http: HttpClient) { }

  public get wallets () : Observable<Wallet[]>{
    return this.http.get<Wallet[]>(`${this.baseUrl}/wallets`);
  };

  public addWallet ( wallet : Wallet) : Observable<Wallet |null> {
    if ( !wallet )
      return of(null);

    return this.http.post<Wallet>(`${this.urlBackend}/wallet`, wallet );
  };

  // public addWallet (wallet: Wallet) : Observable<Wallet | null>{

  //    if( !wallet ) return of(null)

  //   return this.http.post<Wallet>(`${ this.baseUrl }/wallets`, wallet);
  // }

  public updateWallet(wallet: Wallet) : Observable<Wallet | null>{

    if( !wallet.id ) return of(null)

    return this.http.patch<Wallet>(`${this.baseUrl}/wallets/${wallet.id}`, wallet);
  }

  // public getWalletByIdUser(idUser: string): Observable<Wallet | null> {

  //   if( !idUser) return of(null);

  //   return this.http.get<Wallet[]>(`${this.baseUrl}/wallets/?idUser=${idUser}`)
  //   .pipe(
  //     tap( wallet => console.log(wallet)),
  //     map( wallet => {return wallet[0] } ),
  //     catchError( () => { return of(null) })
  //   )

  // }

  public getWalletByIdUser(idUser: string): Observable<Wallet | null> {

    if( !idUser) return of(null);

    return this.http.get<Wallet>(`${this.urlBackend}/wallet/${ idUser }`);


  }

  public deleteWalletByIdUser ( idUser: string ) : Observable<boolean> {

    if ( !idUser ) return of(false);

    return this.getWalletByIdUser( idUser )
    .pipe(
      switchMap( wallet => {

        return this.http.delete(`${this.baseUrl}/wallets/${wallet?.id}`)
        .pipe(
          map( resp => true),
          catchError( () => { return of(false) })
        )
      })
    );

  }



}
