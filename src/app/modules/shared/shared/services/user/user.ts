import { Injectable } from '@angular/core';
import { Auth } from 'src/app/modules/core/providers/auth/auth';
import { Query } from 'src/app/modules/core/providers/query/query';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(
    private readonly authSrv: Auth,
    private readonly querySrv: Query
  ) {}
}
