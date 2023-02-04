import { NgModule } from "@angular/core";
// https://github.com/chukmunnlee/vttp2022_batch2/blob/master/day33-material/src/app/app.component.html
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';

const matModules: any[] = [
    MatToolbarModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatDatepickerModule, MatNativeDateModule,
    MatButtonModule, MatCardModule
]

@NgModule({
    imports: matModules,
    exports: matModules
})

export class MaterialExModule {
}