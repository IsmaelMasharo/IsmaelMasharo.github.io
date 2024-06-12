import * as aq from "../../_npm/arquero@5.4.0/_esm.js"
import { table as obTable } from "../../_observablehq/stdlib/inputs.js"

// TABLE METHODS
const tbShape = (table) => [table.numRows(), table.numCols()]
const tbView = (table, opt = {}) => obTable(table, opt)

aq.addTableMethod("view", tbView, { override: true })
aq.addTableMethod("shape", tbShape, { override: true })

// ARQUERO BASE
export default aq
export const op = aq.op

// SELECTION HELPERS
export const renameLower = (table) =>
  aq.names(table.columnNames().map((col) => col.toLowerCase()))

// COOKBOOK
const distinctName = (dt, col) => aq.agg(dt, op.distinct(col))

const dupByGroup = (dt, col) =>
  dt.groupby(col).derive({ colCount: (d) => op.count() })
