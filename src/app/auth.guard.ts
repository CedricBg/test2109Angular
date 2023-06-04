
import { inject } from '@angular/core';
import { Router} from '@angular/router';

import { AuthService } from './services/auth.service';

export const OPSGuard = () =>{
 const authService = inject(AuthService);
 const router = inject(Router)
 if(sessionStorage.getItem('dimin') === 'OPS' )
    {
      return true;
    }
    router.navigate(['/auth']);
    return false
}

