import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionModalComponent } from '@common/modals/subscription-modal/subscription-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../environments/environment';

@NgModule({
  declarations: [
    SubscriptionModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    // for firebase
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  entryComponents: [
    SubscriptionModalComponent
  ]
})
export class SubscriptionModalModule {
}
