import Filter from './Filter'

export default class AuthenticationFilter implements Filter {
  execute(request: string): void {
    console.log(`Authenticating request: ${request}`)
  }
}