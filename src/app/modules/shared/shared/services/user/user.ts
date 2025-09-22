import { Injectable } from '@angular/core';
import { IUserCreated } from 'src/app/interfaces/userInterface';
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

  async create(user: IUserCreated): Promise<void> {
    try {
      const uid = await this.authSrv.register(user.email, user.password);
      await this.querySrv.set('users', uid, {
        name: user.name,
        lastName: user.lastName,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
