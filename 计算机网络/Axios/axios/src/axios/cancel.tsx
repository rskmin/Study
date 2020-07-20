export class Cancel {
  message: string
  constructor(message: string) {
    this.message = message
  }
}

export function isCancel(error: any) {
  return error instanceof Cancel
}

export class CancelToken {
  source() {
    let _resolve: any
    return {
      token: new Promise((resolve) => {
        _resolve = resolve
      }),
      cancel: (message: string) => {
        _resolve(new Cancel(message))
      }
    }
  }
}