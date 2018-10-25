import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './project/home/home.component';
import { LoginComponent } from './management/login/login.component';
import { RegisterComponent } from './management/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';
import 'rxjs';
import { MapComponent } from './project/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';
import { DiagramComponent } from './project/diagram/diagram.component';
import { ManagmentComponent } from './management/managment/managment.component';
import { AboutComponent } from './project/about/about.component';
import { StatisticsComponent } from './project/statistics/statistics.component';
import { AdressComponent } from './project/adress/adress.component';
import { AntennasService } from './antennas.service';
import { UserService } from './user.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { EnterComponent } from './enter/enter.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ColorPickerModule } from 'primeng/colorpicker';
import { PasswordModule } from 'primeng/password';
import { ToolbarModule } from 'primeng/toolbar';
import { ChartModule } from 'primeng/chart';
import { AuthGuard } from 'src/app/router/router.component';
import {BlockUIModule} from 'primeng/blockui';

//import { ChartsModule } from 'ng2-charts/ng2-charts';

const appRoutes: Routes = [
  {
    path: '', component: ManagmentComponent, children: [
      { path: 'Login', component: LoginComponent, },
      { path: 'Register', component: RegisterComponent, }
    ]
  },
  {
    path: 'Home', component: HomeComponent, children: [
      { path: 'Address', component: AdressComponent },
      { path: 'About', component: AboutComponent },
      { path: 'Statistics', component: StatisticsComponent },
      { path: 'Diagram', component: DiagramComponent },
      { path: 'Map', component: MapComponent },
    ], canActivate: [AuthGuard]
  },
  {
    path: 'Menu', component: EnterComponent, canActivate: [AuthGuard]
  },
  { path: 'NotFound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MapComponent,
    DiagramComponent,
    ManagmentComponent,
    AboutComponent,
    StatisticsComponent,
    AdressComponent,
    NotFoundComponent,
    EnterComponent,
  ],
  imports: [
    TooltipModule,
    BlockUIModule,
    PasswordModule,
    ToolbarModule,
    ColorPickerModule,
    BrowserModule,
    ChartModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    ButtonModule, DialogModule,
    SidebarModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true })
    , FormsModule
    , HttpClientModule,
    MessageModule,
    MessagesModule,
    HttpModule
    , AgmCoreModule.forRoot(
      {
        apiKey: 'AIzaSyDj_YflnC50-74abdppmv8MpRjuRJpiMvM'
        , libraries: ["places"]
      }), MDBBootstrapModule.forRoot()
  ],
  providers: [AntennasService, ConfirmationService, MessageService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
