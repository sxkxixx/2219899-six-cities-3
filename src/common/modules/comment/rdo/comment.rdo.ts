import {Expose, Type} from 'class-transformer';
import {OfferRDO} from '../../offer/index.js';
import {UserRDO} from '../../user/index.js';


export class CommentRdo {
  // TODO: Проверить
  @Expose()
  public id?: string;

  @Expose()
  public comment?: string;

  @Expose()
  public rating?: number;

  @Expose({name: 'createdAt'})
  public postDate?: string;

  @Expose({name: 'userId'})
  @Type(() => UserRDO)
  public user?: UserRDO;

  @Expose({name: 'offerId'})
  @Type(() => OfferRDO)
  public offer?: OfferRDO;
}
