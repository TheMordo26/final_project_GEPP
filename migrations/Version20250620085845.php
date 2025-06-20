<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250620085845 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE question (id SERIAL NOT NULL, template_id INT NOT NULL, question_text TEXT NOT NULL, description TEXT DEFAULT NULL, question_type VARCHAR(255) NOT NULL, is_visible_results_table BOOLEAN NOT NULL, sort_order INT NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_B6F7494E5DA0FB8 ON question (template_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE template (id SERIAL NOT NULL, owner_id INT NOT NULL, title VARCHAR(255) NOT NULL, description TEXT DEFAULT NULL, topic VARCHAR(255) NOT NULL, image_path VARCHAR(255) DEFAULT NULL, is_public BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_97601F837E3C61F9 ON template (owner_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN template.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN template.updated_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE question ADD CONSTRAINT FK_B6F7494E5DA0FB8 FOREIGN KEY (template_id) REFERENCES template (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE template ADD CONSTRAINT FK_97601F837E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE question DROP CONSTRAINT FK_B6F7494E5DA0FB8
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE template DROP CONSTRAINT FK_97601F837E3C61F9
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE question
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE template
        SQL);
    }
}
