import { Repository } from 'typeorm';

/**
 * @param T - Entity class
 * @param repository - TypeOrm repository
 * @param property - property of entity class
 */
export const IsEntityExist = async <T>(
  repository: Repository<T>,
  property: Partial<T>,
) => {
  const entity = await repository.findOne({ where: property });
  return entity;
};
