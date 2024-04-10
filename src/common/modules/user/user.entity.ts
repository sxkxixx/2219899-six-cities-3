import {User} from '../../types';
import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {createSha256} from '../../utils';

export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {collection: 'users'}
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, default: '', type: () => String})
  public name: string;

  @prop({required: true, unique: true, default: '', type: () => String})
  public email: string;

  @prop({required: false, default: '', type: () => String})
  public avatar?: string;

  @prop({required: true, default: '', type: () => String})
  private password?: string;

  constructor(user: User) {
    super();
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSha256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);