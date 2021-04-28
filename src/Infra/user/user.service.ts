import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { SignInUseCase } from '@app/sign-in-use-case/sign-in.use-case';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Payload } from './interfaces/payload.interface';
import { SignUpUseCase } from '@app/sign-up-use-case/sign-up.use-case';

@Injectable()
export class UserService {
  constructor(
    @Inject(SignInUseCase) private readonly signInUseCase: SignInUseCase,
    @Inject(SignUpUseCase) private readonly signUpUseCase: SignUpUseCase,
  ) {}

  async signIn(dto: SignInDto): Promise<void> {
    const result = await this.signInUseCase.execute(dto);
    //
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async SignUp(dto: SignUpDto): Promise<Payload> {
    const result = await this.signUpUseCase.execute(dto);
    if (result.isFailure) {
      //
      throw new PreconditionFailedException(result.error);
    }
    return { token: result.getResult().token };
  }
}