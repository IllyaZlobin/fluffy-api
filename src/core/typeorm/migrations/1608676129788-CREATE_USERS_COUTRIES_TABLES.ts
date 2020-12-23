import {MigrationInterface, QueryRunner} from "typeorm";

export class CREATEUSERSCOUTRIESTABLES1608676129788 implements MigrationInterface {
    name = 'CREATEUSERSCOUTRIESTABLES1608676129788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `role` enum ('0', '1') NOT NULL, `gender` enum ('0', '1') NOT NULL, `phone` varchar(255) NOT NULL, `zipCode` varchar(100) NOT NULL, `address` varchar(255) NOT NULL, `countryId` int NULL, INDEX `IDX_5372672fbfd1677205e0ce3ece` (`firstName`), INDEX `IDX_af99afb7cf88ce20aff6977e68` (`lastName`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), INDEX `IDX_b0ec0293d53a1385955f9834d5` (`address`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `countries` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, UNIQUE INDEX `IDX_fa1376321185575cf2226b1491` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_cc0dc7234854a65964f1a268275` FOREIGN KEY (`countryId`) REFERENCES `countries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_cc0dc7234854a65964f1a268275`");
        await queryRunner.query("DROP INDEX `IDX_fa1376321185575cf2226b1491` ON `countries`");
        await queryRunner.query("DROP TABLE `countries`");
        await queryRunner.query("DROP INDEX `IDX_b0ec0293d53a1385955f9834d5` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_af99afb7cf88ce20aff6977e68` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_5372672fbfd1677205e0ce3ece` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
