import {pool} from "../../../db.config";

export const storeRepository = {
  async createStore(data: any) {
    const query = `
      INSERT INTO stores (name, region, address, category)
      VALUES (?, ?, ?, ?)
    `;
    
    const [result]: any = await pool.execute(query, [
      data.name,
      data.region,
      data.address,
      data.category,
    ]);

    return result.insertId;
  },

  async findStoreById(storeId: number) {
    const query = `
      SELECT * FROM stores
      WHERE id = ?
    `;
    const [rows]: any = await pool.execute(query, [storeId]);
    return rows[0];
  },
};