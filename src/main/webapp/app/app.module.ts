import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { GatewaySharedModule } from 'app/shared/shared.module';
import { GatewayCoreModule } from 'app/core/core.module';
import { GatewayAppRoutingModule } from './app-routing.module';
import { GatewayHomeModule } from './home/home.module';
import { GatewayEntityModule } from './entities/entity.module';


// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { AsideBarrComponent } from './layouts/aside-barr/aside-barr.component';
import { HeaderComponent } from './layouts/header/header.component';
import { AsideBarrFooterComponent } from './layouts/aside-barr-footer/aside-barr-footer.component';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {TabsModule} from "ngx-bootstrap/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts";
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@NgModule({
  imports: [
    BrowserModule,
    GatewaySharedModule,
    GatewayCoreModule,
    GatewayHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    GatewayEntityModule,
    GatewayAppRoutingModule,
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    LoadingBarRouterModule,
    LoadingBarModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent, AsideBarrComponent, HeaderComponent, AsideBarrFooterComponent],
  bootstrap: [MainComponent],
})
export class GatewayAppModule {}
