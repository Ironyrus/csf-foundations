import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./components/main.component";
import { OrdersComponent } from "./orders/orders.component";


const appRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: 'orders/:email', component: OrdersComponent},
    { path: '**', redirectTo: ''}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}