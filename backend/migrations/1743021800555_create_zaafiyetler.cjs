/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('tbl_zaafiyetler', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        zafiyet_adi: {
            type: 'varchar(100)',
            notNull: true
        },
        aciklama: {
            type: 'text',
            notNull: true
        },
        risk_seviyesi: {
            type: 'varchar(50)',
            notNull: true
        },
        status: {
            type: 'boolean',
            notNull: true,
            default: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('tbl_zaafiyetler');
}; 