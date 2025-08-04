const BaseRepository = require("./baseRepository");

class SheetRepository extends BaseRepository {
  constructor() {
    super("sheets");
  }

  async findAll(userId = null) {
    let query = this.supabase.from(this.tableName).select("*");
    if (userId) {
      query = query.eq("user_id", userId);
    }
    const { data, error } = await query.order("updated_at", {
      ascending: false,
    });
    if (error) throw error;
    return data;
  }

  async findGridIds(tableId) {
    // fetches 2 arrays: one for row IDs and one for column IDs
  }

  async fetchGrid(sheetId, rowIds, colIds) {
    // fetches data of cells given their rowIDs and colIDs
  }

  async upsertCellsData(sheetId, cellData) {
    // upserts multiple cells data in a single transaction
  }

  async findByUserId(userId) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  async updateData(sheetId, sheetData) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update({
        data: sheetData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", sheetId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async countByUserId(userId) {
    return this.count({ user_id: userId });
  }

  async initializeSheet(name) {
    const { data, error } = await this.supabase.rpc("initialize_table", {
      tname: name,
    });

    if (error) throw error;
    
    return data;
  }
}

module.exports = SheetRepository;
