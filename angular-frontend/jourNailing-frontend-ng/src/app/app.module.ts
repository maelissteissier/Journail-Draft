import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AddFoodJournalEntryComponent} from './add-food-journal-entry/add-food-journal-entry.component';
import {HomeComponent} from './home/home.component';
import {QuickAddFoodLogComponent} from './quick-add-food-log/quick-add-food-log.component';
import {CalculatorAddFoodLogComponent} from './calculator-add-food-log/calculator-add-food-log.component';
import {CaloriesCalculatorComponent} from './calories-calculator/calories-calculator.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FoodRefListModalComponent } from './food-ref-list-modal/food-ref-list-modal.component';
import { FoodRefListComponent } from './food-ref-list/food-ref-list.component';
import { AddFoodRefModalComponent } from './add-food-ref-modal/add-food-ref-modal.component';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { DisplayFoodJournalComponent } from './display-food-journal/display-food-journal.component';
import { AppMenuBarComponent } from './app-menu-bar/app-menu-bar.component';
import { FoodRefManagementPageComponent } from './food-ref-management-page/food-ref-management-page.component';
import { DeleteFoodEntryModalComponent } from './delete-food-entry-modal/delete-food-entry-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        AddFoodJournalEntryComponent,
        HomeComponent,
        QuickAddFoodLogComponent,
        CalculatorAddFoodLogComponent,
        CaloriesCalculatorComponent,
        AppLayoutComponent,
        FoodRefListModalComponent,
        FoodRefListComponent,
        AddFoodRefModalComponent,
        ToastMessageComponent,
        DisplayFoodJournalComponent,
        AppMenuBarComponent,
        FoodRefManagementPageComponent,
        DeleteFoodEntryModalComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
