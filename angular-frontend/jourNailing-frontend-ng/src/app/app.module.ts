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

@NgModule({
    declarations: [
        AppComponent,
        AddFoodJournalEntryComponent,
        HomeComponent,
        QuickAddFoodLogComponent,
        CalculatorAddFoodLogComponent,
        CaloriesCalculatorComponent,
        AppLayoutComponent
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
