import {Injectable} from '@angular/core';
import {io} from 'socket.io-client';
import {Observable, Observer} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WebSocketService {
	//@ts-ignore
	private socket: WebSocket;
	private socketUrl = 'ws://localhost:3000'; // Adres URL WebSocket

	public connectToWebSocket(): Observable<any> {
		return new Observable<any>((observer: Observer<any>) => {
			this.socket = new WebSocket(this.socketUrl);

			this.socket.onopen = () => {
				console.log('WebSocket connected');
				observer.next({ type: 'open' });
			};

			this.socket.onmessage = (event: MessageEvent) => {
				console.log('WebSocket message received:', event.data);
				observer.next({ type: 'message', data: event.data });
			};
			//@ts-ignore
			this.socket.onerror = (error: ErrorEvent) => {
				console.error('WebSocket error:', error);
				observer.error(error);
			};

			this.socket.onclose = () => {
				console.log('WebSocket disconnected');
				observer.complete();
			};

			// Return function to unsubscribe and close WebSocket connection
			return () => {
				if (this.socket) {
					this.socket.close();
				}
			};
		});
	}

	public sendMessage(message: string): void {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(message);
		}
	}
}
