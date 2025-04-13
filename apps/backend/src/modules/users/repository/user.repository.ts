import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entities/user.entity';
import { BaseRepository } from 'src/common/base/base-repository/base.repository';
import { HttpErrorService } from 'src/services/http-error-service/index.service';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    protected readonly errorService: HttpErrorService,
  ) {
    super(userModel, errorService);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }
}
