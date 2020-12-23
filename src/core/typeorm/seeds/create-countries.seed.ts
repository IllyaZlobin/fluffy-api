import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { CountryEntity } from '../entities';
import { COUNTRIES } from '../factories/country.factory';

export default class CreateCountriesSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(CountryEntity)
      .values(COUNTRIES)
      .execute();
  }
}
