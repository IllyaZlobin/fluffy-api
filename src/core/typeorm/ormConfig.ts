import { ConfigService } from '../../modules/bootstrap/services/config.service';

const connectionOptions = () => {
  const configService = new ConfigService();
  return configService.TypeOrmConfig;
};

export = connectionOptions();
