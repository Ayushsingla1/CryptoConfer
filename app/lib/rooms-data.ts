export type Room = {
    id : string,
    participants : Set<string>,
}

export const Rooms = new Map<string,Room>();
