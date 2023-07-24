import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddFoodJournalEntryComponent} from "./add-food-journal-entry/add-food-journal-entry.component";
import {HomeComponent} from "./home/home.component";
import {AppComponent} from "./app.component";
import {DisplayFoodJournalComponent} from "./display-food-journal/display-food-journal.component";
import {FoodRefListComponent} from "./food-ref-list/food-ref-list.component";
import {FoodRefManagementPageComponent} from "./food-ref-management-page/food-ref-management-page.component";

const routes: Routes = [
    {
        path: "",
        component: AppComponent,
        children: [
            // {path: "", component: HomeComponent},
            {path: "add-food-journal-entry", component: AddFoodJournalEntryComponent},
            {path: "food-journal", component: DisplayFoodJournalComponent},
            {path: "food-ref-management", component: FoodRefManagementPageComponent}
        ]

    },
    {
        path: "home",
        component: HomeComponent
    }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
