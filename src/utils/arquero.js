import * as aq from "npm:arquero"
import { table as obTable } from "npm:@observablehq/inputs"

const tbShape = (table) => [table.numRows(), table.numCols()]
const tbView = (table, opt = {}) => obTable(table, opt)

aq.addTableMethod("view", tbView, { override: true })
aq.addTableMethod("shape", tbShape, { override: true })

export default aq
export const renameLower = (table) => aq.names(table.columnNames().map((col) => col.toLowerCase()))