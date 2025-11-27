import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

// Define an interface for the expected error structure
interface RpcErrorMessage {
  status: number;
  message: string;
}

// Create a type guard function
function isRpcErrorMessage(error: any): error is RpcErrorMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number' &&
    'message' in error &&
    typeof error.message === 'string'
  );
}

@Catch(RpcException)
export class RcpCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    // return throwError(() => exception.getError());
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    if (rpcError.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: rpcError
          .toString()
          .substring(0, rpcError.toString().indexOf('(') - 1),
      });
    }

    if (isRpcErrorMessage(rpcError)) {
      const status = isNaN(+rpcError.status) ? 400 : rpcError.status;
      return response.status(status).json(rpcError);
    }
    response.status(400).json({
      status: 400,
      message: rpcError,
    });
  }
}
