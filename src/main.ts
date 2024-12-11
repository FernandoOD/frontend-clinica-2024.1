import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';  // Importa platformBrowserDynamic
import { AppModule } from './app/app.module';  // Importa tu AppModule



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
