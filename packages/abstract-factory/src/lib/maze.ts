enum Direction {
  North,
  South,
  East,
  West,
}

abstract class MapSite {
  abstract enter(): void
}

export class Room extends MapSite {
  private sides: Array<MapSite> = []
  private _roomNumber: number

  constructor(roomNumber: number) {
    super()
    this._roomNumber = roomNumber
  }

  get roomNumber(): number {
    return this._roomNumber
  }

  getSide(direction: Direction): MapSite {
    return this.sides[direction]
  }

  setSide(direction: Direction, side: MapSite): void {
    this.sides[direction] = side
  }

  enter(): void {
    console.log(`Entering room ${this.roomNumber}`)
  }
}

export class Wall extends MapSite {
  enter(): void {
    console.log(`Wall`)
  }
}

export class Door extends MapSite {
  private room1: Room
  private room2: Room
  private isOpen = false

  constructor(room1: Room, room2: Room) {
    super()
    this.room1 = room1
    this.room2 = room2
  }

  enter(): void {
    console.log(`Door`)
  }

  otherSideFrom(room: Room): Room {
    return this.room1 === room ? this.room2 : this.room1
  }
}

export class Maze {
  private rooms: Array<Room> = []

  addRoom(room: Room): void {
    this.rooms.push(room)
  }

  roomNumber(roomNumber: number): Room | undefined {
    return this.rooms.find((room) => room.roomNumber === roomNumber)
  }
}

export class MazeGame {
  createMaze(): Maze {
    const maze = new Maze()
    const room1 = new Room(1)
    const room2 = new Room(2)
    const door = new Door(room1, room2)
    maze.addRoom(room1)
    maze.addRoom(room2)

    room1.setSide(Direction.North, new Wall())
    room1.setSide(Direction.East, door)
    room1.setSide(Direction.South, new Wall())
    room1.setSide(Direction.West, new Wall())

    room2.setSide(Direction.North, new Wall())
    room2.setSide(Direction.East, new Wall())
    room2.setSide(Direction.South, new Wall())
    room2.setSide(Direction.West, door)

    return maze
  }
}
