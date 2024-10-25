export class GetAllProfilesQuery {
  constructor(
    public readonly filters: any,
    public readonly page: number,
    public readonly limit: number,
  ) {}
}
