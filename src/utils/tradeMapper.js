// Converts between the DB row shape (snake_case, matches supabase-schema.sql)
// and the API/frontend shape (camelCase). Keeping this mapping in one place
// means the DB naming convention never leaks into the frontend.

export function tradeToRow(trade) {
  return {
    date: trade.date,
    entry_timeframe: trade.entryTimeframe,
    direction: trade.direction,
    bias_htf: trade.biasHtf,
    bias_ltf: trade.biasLtf,
    premium_discount: trade.premiumDiscount,
    concepts: trade.concepts || {},
    strategy_id: trade.strategyId || null,
    strategy_name: trade.strategyName || null,
    lot_size: numOrNull(trade.lotSize),
    contract_size: numOrNull(trade.contractSize),
    entry_price: numOrNull(trade.entryPrice),
    exit_price: trade.status === "closed" ? numOrNull(trade.exitPrice) : null,
    fees: numOrNull(trade.fees) ?? 0,
    planned_risk: numOrNull(trade.plannedRisk),
    status: trade.status,
    mistake: trade.mistake || null,
    lesson: trade.lesson || null,
    screenshot: trade.screenshot || null
  };
}

export function rowToTrade(row) {
  return {
    id: row.id,
    date: row.date,
    entryTimeframe: row.entry_timeframe,
    direction: row.direction,
    biasHtf: row.bias_htf,
    biasLtf: row.bias_ltf,
    premiumDiscount: row.premium_discount,
    concepts: row.concepts || {},
    strategyId: row.strategy_id || "",
    strategyName: row.strategy_name || "",
    lotSize: row.lot_size,
    contractSize: row.contract_size,
    entryPrice: row.entry_price,
    exitPrice: row.exit_price,
    fees: row.fees,
    plannedRisk: row.planned_risk,
    status: row.status,
    mistake: row.mistake || "",
    lesson: row.lesson || "",
    screenshot: row.screenshot || null,
    createdAt: row.created_at
  };
}

export function strategyToRow(strategy) {
  return {
    name: strategy.name,
    description: strategy.description || null
  };
}

export function rowToStrategy(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description || "",
    createdAt: row.created_at
  };
}

function numOrNull(v) {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}
