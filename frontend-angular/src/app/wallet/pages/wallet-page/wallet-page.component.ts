import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { User } from '../../../auth/models/user.model';
import { environment } from '../../../../environments/environment';
import { Wallet } from '../../../models/wallet/wallet.models';
import { BehaviorSubject, Observable, filter, pipe, tap } from 'rxjs';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmTransactionDialogComponent } from '../../../shared/confirm-transaction-dialog/confirm-transaction-dialog.component';
import { DialogConfirmData } from '../../../models/dialog/dialog.interface';
import { Operation } from '../../../models/enum/dialog.enum';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { CustomHelpers } from '../../../shared/helpers/custom-helpers';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrl: './wallet-page.component.css'
})
export class WalletPageComponent implements OnInit {

  private token: string = environment.userToken;
  public wallet: Wallet | null = null;
  private user: User | null = null;
  private userID : string | null = null;


  public formFunds: FormGroup = new FormGroup({
    funds: new FormControl('',
      [
        Validators.required,
        Validators.min(100),
        Validators.max(1000000),
        CustomValidators.onlyNumbers(),
        CustomValidators.noSymbols(),
      ]),
  });

  constructor(
    private walletService: WalletService,
    private toastService: ToastService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.getUserFromLocalStorage();
    this.getWallet();

  }

  private getUserFromLocalStorage(): void {
    const { id } = JSON.parse(localStorage.getItem('user')!);
    this.userID = id;
  }


  private getWallet(): void {

    this.walletService.getWalletByIdUser(this.userID!).subscribe({
      next: ( wallet ) => {
        this.wallet = wallet;
        console.log( this.wallet );
      },

      error: ( error ) => {
        console.log( {error} )
        this.createWallet();
        console.log( this.wallet );
      }
    });

      // .pipe(
      //   tap( wallet => { if (!wallet) { this.createWallet() } }),
      //   tap( wallet => { if (wallet) { this.wallet = wallet} } )
      // )
      // .subscribe();

  }

  public depositFunds(): void {

    if (this.formFunds.invalid || !this.wallet) return;

    const funds: number = Number.parseFloat(this.formFunds.controls['funds'].value);

    this.openDialogConfirm( funds , Operation.DEPOSIT_FUNDS)
    .pipe(
      filter( operation => !!operation ),
      tap( () => this.wallet!.funds += funds ),
      tap( () => this.formFunds.reset()),
    )
    .subscribe( () => {
      this.updateWallet();
    })


  }

  public withdrawFunds(): void {

    if (this.formFunds.invalid || !this.wallet) return;

    const funds: number = Number.parseFloat(this.formFunds.controls['funds'].value);

    if (this.wallet.funds < funds) return this.toastService.showError('Error', 'Fondos insuficientes!');

    debugger;

    this.openDialogConfirm( funds , Operation.WITHDRAW_FUNDS)
    .pipe(
      filter( operation => !!operation ),
      tap	( () => this.wallet!.funds -= funds ),
      tap ( () => { if ( this.wallet!.funds <= 0 ) { this.wallet!.funds = 0 } } ),
      tap( () => this.formFunds.reset()),
    )
    .subscribe( () => {
      this.updateWallet();
    })
  }

  private openDialogConfirm ( funds: number, operation: Operation ) : Observable<boolean> {

    const dialogConfirmData: DialogConfirmData = {
      funds: funds,
      operation: operation,
    }

    const dialogRef = this.dialog.open( ConfirmTransactionDialogComponent, { data: dialogConfirmData} );

    return dialogRef.afterClosed();


  }


  public isValidfield( field: string ): boolean | null {

    return this.formFunds.get(field)!.invalid && this.formFunds.get(field)!.touched;

  }

  public messageFieldError(field: string): string | null {

    const errors: ValidationErrors | null = CustomHelpers.getFieldErrors(field, this.formFunds);

    if (errors) {
      for (const key of Object.keys(errors)) {
        switch (key) {

          case 'required':
            return 'Este campo es requerido';

          case 'min':
            return `Monto mínimo ${errors['min'].min}`;

          case 'max':
            return `Monto máximo ${errors['max'].max}`;

          case 'hasLetters':
            return 'Monto inválido';

          case 'hasSymbols':
            return 'Monto inválido';
        }
      }
    }

    return null;
  }


  private createWallet() : void {

    const wallet = new Wallet({
      funds: 0,
      idUser: this.userID!,
    });

    console.log({ wallet });

    this.walletService.addWallet(wallet).subscribe({
      next : ( wallet ) => {
        console.log( wallet );
      },

      error: ( error ) => {
        console.log( error );
      }
    })

  }

  private updateWallet() : void {

    if (!this.wallet) return;

    this.walletService.updateWallet(this.wallet)
      .pipe(
        tap(wallet => this.wallet = wallet),
        tap( () => this.toastService.showSuccess('Éxito', 'Operacion realizada con exito!' )),
      )
      .subscribe();

  }

}
