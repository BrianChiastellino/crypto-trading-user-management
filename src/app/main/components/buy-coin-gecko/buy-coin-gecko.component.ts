import { AfterContentInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletService } from '../../../wallet/services/wallet.service';
import { Wallet } from '../../../models/wallet/wallet.models';
import { User } from '../../../auth/models/user.model';
import { CoinGecko } from '../../../models/coin-gecko/interface/coin-gecko.models';
import { Dialogdata } from '../../../models/coin-gecko/dialog/dialog.interface';
import { DialogBuyComponent } from '../dialog/dialog-buy/dialog-buy.component';
import { BehaviorSubject, filter, tap } from 'rxjs';

@Component({
  selector: 'app-buy-coin-gecko',
  templateUrl: './buy-coin-gecko.component.html',
  styleUrl: './buy-coin-gecko.component.css'
})

export class BuyCoinGeckoComponent implements OnInit {

  @Input() public wallet: Wallet | null = null;
  @Input() public user: User | null = null;
  @Input() public coin$: BehaviorSubject<CoinGecko | null> = new BehaviorSubject<CoinGecko | null>(null);
  public toast$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor (
    private dialog: MatDialog,
    private walletService: WalletService,
  ) {}

  ngAfterContentInit(): void {
    console.log('after');
  }

  public ngOnInit(): void {

      this.coin$.subscribe(coin => {

      if(this.wallet && this.user && coin != null) {
        this.openDialog( this.wallet, coin);
      }

    });

  }

  private openDialog ( wallet: Wallet, coinGecko: CoinGecko ): void {

    const dialogData: Dialogdata = {
      wallet: wallet,
      coinGecko: coinGecko
    }

    const dialogRef = this.dialog.open( DialogBuyComponent, { data: dialogData } );

    dialogRef.afterClosed()
    .pipe(
      filter( data => !!data),
      tap( data => console.log({ data })),
    )
    .subscribe( wallet => {
      this.updateWallet( wallet );
    });

  }

  private updateWallet (wallet : Wallet ) : void {
    this.walletService.updateWallet( wallet )
    .pipe(
      filter( data => !!data),
      tap( wallet => this.wallet = wallet),
    )
    .subscribe( () => {
      this.toast$.next('success');
    });
  }


}

