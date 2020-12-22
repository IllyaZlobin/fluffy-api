import {MigrationInterface, QueryRunner} from "typeorm";

export class CREATECOUNTRIESTABLE1608673047151 implements MigrationInterface {
    name = 'CREATECOUNTRIESTABLE1608673047151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `countries` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, UNIQUE INDEX `IDX_fa1376321185575cf2226b1491` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_fa1376321185575cf2226b1491` ON `countries`");
        await queryRunner.query("DROP TABLE `countries`");
    }

}
