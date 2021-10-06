import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [MatListModule, DragDropModule, MatSortModule, MatSelectModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatMenuModule, MatDialogModule, MatCardModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatPaginatorModule, MatTabsModule, MatSlideToggleModule, MatRadioModule, MatExpansionModule, MatSnackBarModule, MatProgressSpinnerModule, MatToolbarModule, MatTooltipModule, MatIconModule, MatProgressBarModule, MatSliderModule],
  exports: [MatListModule, DragDropModule, MatSortModule, MatSelectModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatMenuModule, MatDialogModule, MatCardModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatPaginatorModule, MatTabsModule, MatSlideToggleModule, MatRadioModule, MatExpansionModule, MatSnackBarModule, MatProgressSpinnerModule, MatToolbarModule, MatTooltipModule, MatIconModule, MatProgressBarModule, MatSliderModule]
})
export class MaterialModule { }
