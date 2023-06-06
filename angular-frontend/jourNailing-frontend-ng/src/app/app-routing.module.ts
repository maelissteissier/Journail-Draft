import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddFoodJournalEntryComponent} from "./add-food-journal-entry/add-food-journal-entry.component";
import {HomeComponent} from "./home/home.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
    {
        path: "",
        component: AppComponent,
        children: [
            // {path: "", component: HomeComponent},
            {path: "add-food-journal-entry", component: AddFoodJournalEntryComponent}
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
