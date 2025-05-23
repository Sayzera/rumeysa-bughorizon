/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.alterColumn('tbl_zaafiyetler', 'zaafiyet_aciklamasi', {
        type: 'varchar(255)',
        notNull: true,
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.alterColumn('tbl_zaafiyetler', 'zaafiyet_aciklamasi', {
        type: 'varchar(16)',
        notNull: true,
    });
};