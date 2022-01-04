export class OrderedDish {
  constructor(
    public name: string,
    public rating: number,
  ) {
  }
}

export class Roles {
  constructor(
    public user : boolean,
    public manager : boolean,
    public admin : boolean,
    public banned : boolean
  ) {}
}

export class dbUser {
  constructor(
    public UID: string,
    public nick: string,
    public roles: Roles,
    public orders: OrderedDish[]
  ) {
  }
}
