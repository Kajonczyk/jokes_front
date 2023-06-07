export interface Room {
	id: string;
	ownerId: string
	name: string
	membersCount: number
	membersLimit: number
}

export interface Game {
	id: string,
	roomId: string,
	userId: string,
	room: Room,
	startedAt: Date
	finishedAt: Date
	rounds: number
	turns: Turn[]
	roundsCount: number
}

export interface Turn {
	id: string,
	gameId: string,
	userId: string,
	score: any, //@TODO ADD AFTER BACKEND CHANGES. NOT DEALING WITH THAT RIGHT NOW!!,
	nextTurnId: string,
	turnUserId: string,
	status: string;
	jokeId: string
}
