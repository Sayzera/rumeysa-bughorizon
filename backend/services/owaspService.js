import pool from "../config/db.js";

export const owaspListService = async (req, res) => {
  try {
    const { name, status } = req.body;

    await pool.query(`update tbl_owasp_list set status = $1 where name = $2`, [
      status,
      name,
    ]);

    return true;
  } catch (error) {
    console.error("[owaspListService]:", error);
    throw new Error("[owaspListService]:" + error.message);
  }
};

export const getByNameOwaspService = async (req) => {
  // query params
  const { name } = req.query;

  try {
    const owaspStatus = await pool.query(
      "SELECT * FROM tbl_owasp_list where name = $1",
      [name]
    );

    if (owaspStatus.rows.length === 0) {
      throw new Error("OWASP listesi bulunamadı.");
    }

    return owaspStatus.rows[0].status;
  } catch (error) {
    console.error("[getByNameOwaspService]:", error);
    throw new Error("[getByNameOwaspService]:" + error.message);
  }
};
