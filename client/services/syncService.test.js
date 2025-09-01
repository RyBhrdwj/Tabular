import { describe, it, expect } from "vitest";
import syncService from "./syncService";

describe("syncService (real API)", () => {
  let createdSheetId = '0b8cce26-767e-4607-ae65-11e487c03acb';

  // it("should create a sheet", async () => {
  //   const result = await syncService.createSheet();
  //   createdSheetId = result;
  //   console.log("createSheet result:", result);
  // });

  // it("should fetch all sheets", async () => {
  //   const result = await syncService.fetchAllSheets();
  //   console.log("fetchAllSheets result:", result);
  // });

  // it("should fetch sheet grid ids", async () => {
  //   const result = await syncService.fetchSheetGridIds(createdSheetId);
  //   console.log("fetchSheetGridIds result:", result);
  // });
  
  it("should upsert cells", async () => {
    const cells = [
      { rid: 1, cid: 21, value: 42 },
      { rid: 31, cid: 41, value: "Hello" },
    ];
    console.log({ cells });
    const result = await syncService.upsertCells(createdSheetId, cells);
    console.log("upsertCells result:", result);
  });
  
  it("should fetch a sheet", async () => {
    const result = await syncService.fetchSheet(createdSheetId);
    console.log("fetchSheet result:", result);
  });

  it("should transform cells", () => {
    syncService.markCellDirty({ rid: 1, cid: 21, value: 42, formula: "=A1*A2" });
    syncService.markCellDirty({ rid: 1, cid: 21, value: 42, formula: "=A1*A2" });
    syncService.markCellDirty({ rid: 1, cid: 1, value: 32, formula: "=A1*A2" });
    const result = syncService.transformCells();
    console.log("transformCells result:", result);
    expect(syncService.dirty_cells.size).toBe(0);
    expect(result.size).toBe(2);
  })

  // it("should mark a cell as dirty", () => {
  //   syncService.markCellDirty("A1");
  //   console.log(
  //     "dirty_cells after markCellDirty:",
  //     Array.from(syncService.dirty_cells)
  //   );
  // });
});
