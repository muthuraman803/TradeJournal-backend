import { supabase } from "../supabaseClient.js";
import { strategyToRow, rowToStrategy } from "../utils/tradeMapper.js";

export async function listStrategies(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("strategies")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;
    res.json(data.map(rowToStrategy));
  } catch (err) {
    next(err);
  }
}

export async function createStrategy(req, res, next) {
  try {
    if (!req.body.name || !req.body.name.trim()) {
      return res.status(400).json({ error: "name is required" });
    }
    const { data, error } = await supabase
      .from("strategies")
      .insert(strategyToRow(req.body))
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(rowToStrategy(data));
  } catch (err) {
    next(err);
  }
}

export async function updateStrategy(req, res, next) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("strategies")
      .update(strategyToRow(req.body))
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Strategy not found" });
    res.json(rowToStrategy(data));
  } catch (err) {
    next(err);
  }
}

export async function deleteStrategy(req, res, next) {
  try {
    const { id } = req.params;
    // trades.strategy_id references this with ON DELETE SET NULL,
    // so existing trades keep their strategy_name label but lose the link.
    const { error } = await supabase.from("strategies").delete().eq("id", id);
    if (error) throw error;
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
