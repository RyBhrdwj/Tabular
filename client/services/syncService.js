import axios from "axios";
import debounce from "lodash.debounce";

const sheetApi = axios.create({
  baseURL: "http://localhost:3000/sheet",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

class syncService {
  
  constructor(api) {
    this.api = api;
    this.dirty_cells = new Set();

    // this.upsertCells = debounce(this.upsertCells, 10000); // 10 seconds
  }

  markCellDirty = (cellId) => {
    this.dirty_cells.add(cellId);
  };

  createSheet = async () => {
    try {
      const response = await this.api.post("/", { data: {} });
      return response.data;
    } catch (error) {
      console.error("Error creating sheet:", error);
      throw error;
    }
  };

  fetchAllSheets = async () => {
    try {
      const response = await this.api.get("/");
      return response.data;
    } catch (error) {
      console.error("Error fetching sheets:", error);
      throw error;
    }
  };

  fetchSheetGridIds = async (sheetId) => {
    try {
      const response = await this.api.get(`/${sheetId}/grid`);
      return response.data;
    } catch (error) {
      console.error("Error fetching sheet grid IDs:", error);
      throw error;
    }
  };

  fetchSheet = async (sheetId) => {
    try {
      const response = await this.api.get(`/${sheetId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching sheet:", error);
      throw error;
    }
  };

  // Using the tableService, fetch rid, cid, and value is formula || value
  // cells : Set<Cell>
  transformCells = () => {
    const transformedCells = [];

    for (const cell of this.dirty_cells) {
      transformedCells.push({
        rid: cell.rid,
        cid: cell.cid,
        value: cell.formula || cell.value,
      });
    }

    // Clear the dirty cells after transformation
    this.dirty_cells.clear();

    return transformedCells;
  };

  upsertCells = async (sheetId, cells) => {
    try {
      // utils method to transform cells to the required format
      const response = await this.api.put(`/${sheetId}`, { cells: this.transformCells() });
      return response.data;
    } catch (error) {
      console.error("Error updating cells:", error);
      throw error;
    }
  };
}

export default new syncService(sheetApi);