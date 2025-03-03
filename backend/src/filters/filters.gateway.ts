import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class FiltersGateway {
  TAG = 'FILTER GATEWAY';
  @WebSocketServer() server;

  echoReversedFilters(map: Map<string, string[]>): void {
    /*
     * WATCH OUT ! Socket.io will do JSON.stringify() on the he must emit
     * Unfortunately; Maps datatype cannot be JSON-encoded
     * JSON.stringify(m) --> {}
     * So we can't use this : this.server.emit('filter-echo', filters);
     *
     * A possible solution is to emit an array of array, transmit it,
     * and recreate the Map object on the client : const newMap = new Map(JSON.parse(transitString));
     */
    const transition = JSON.stringify(Array.from(map));
    console.log(`${this.TAG} :: EMIT :: ECHO REVERSED FILTER :: ${transition}`);
    this.server.emit('reversed-filter-echo', transition);
  }

  clearFilters(): void {
    console.log(`${this.TAG} :: EMIT :: CLEAR FILTERS`);
    this.server.emit('clear-filters');
  }
}
