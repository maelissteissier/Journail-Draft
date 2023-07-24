import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddFoodJournalEntryComponent} from "./add-food-journal-entry/add-food-journal-entry.component";
import {HomeComponent} from "./home/home.component";
import {AppComponent} from "./app.component";
import {DisplayFoodJournalComponent} from "./display-food-journal/display-food-journal.component";
import {FoodRefManagementPageComponent} from "./food-ref-management-page/food-ref-management-page.component";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "",
        component: AppComponent,
        children: [
            {path: "add-food-journal-entry", component: AddFoodJournalEntryComponent},
            {path: "food-journal", component: DisplayFoodJournalComponent},
            {path: "food-ref-management", component: FoodRefManagementPageComponent}
        ]

    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
