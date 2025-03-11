import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';  // Importa platformBrowserDynamic
import { AppModule } from './app/app.module';  // Importa tu AppModule
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';


platformBrowserDynamic().bootstrapModule(AppModule , {
  providers: [provideCharts(withDefaultRegisterables())],
}).catch(err => console.error(err));
