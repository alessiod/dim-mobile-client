import { Component, ViewChild, EventEmitter } from "@angular/core";
import { ionicBootstrap, Platform, MenuController, Nav } from "ionic-angular";
import { StatusBar } from "ionic-native";
import { DestinyServices } from "./providers/destiny-services/destiny-services";
import { DimPrincipal } from "./providers/auth/dim-principal";
import { AuthServices } from "./providers/auth/auth-services";
import { AppLandingPage } from "./pages/app-landing/app-landing";
import { SignInPage } from "./pages/sign-in/sign-in";

@Component({
  templateUrl: "build/app.html",
  providers: [AuthServices, DimPrincipal, DestinyServices]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = AppLandingPage;
  pages: Array<{ title: string, component: any }>;

  private loginEventSubscription: any;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private auth: AuthServices
  ) {
    this.initializeApp();

    // Wireup Login Modal w/ event from AuthService
    this.loginEventSubscription = this.auth.loginEvent.subscribe((data) => {
      this.showLogin();
    });


    this.rootPage = AppLandingPage;

    // Check to see if the user has previously logged into Bungie.net
    this.auth.principal.getIdentity()
      .then((response) => {
        if (this.auth.principal.isAuthenticated) {
          this.rootPage = AppLandingPage;
        } else {
          this.auth.showLoginDialog();
        }
      }, (error) => {
        // TODO Handle error.
      });

    // set our app's pages
    this.pages = [
      { title: "Hello Ionic", component: AppLandingPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  ngOnDestroy() {
    this.loginEventSubscription.dispose();
  }

  showLogin() {
    this.rootPage = SignInPage;
  }
}

// enableProdMode();

ionicBootstrap(MyApp)
  .then(success => console.log(`Bootstrap success`))
  .catch(error => console.log(error));
