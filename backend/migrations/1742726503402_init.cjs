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
  pgm.createTable("tbl_zip_slip", {
    id: { type: "serial", primaryKey: true },
    name: { type: "varchar(255)", notNull: false },
    address: { type: "varchar(255)", notNull: false },
    // user
    user_id: {
      type: "integer",
      notNull: false,
      references: "tbl_users",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    file: { type: "bytea", notNull: false },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
    updated_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
