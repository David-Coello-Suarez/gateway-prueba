import { Catch, RpcExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class KafkaRpcExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException): Observable<any> {
    const error = exception.getError();

    const payload =
      typeof error === 'object'
        ? error
        : { status: HttpStatus.INTERNAL_SERVER_ERROR, message: String(error) };

    return throwError(() => payload);
  }
}
