export class UserDTO {
  constructor(
    public id?: number,
    public email?: string,
    public role?: string,
    public suspended?: boolean,
    public created_at?: string
  ) {}
}
