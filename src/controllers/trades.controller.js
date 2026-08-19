import { supabase } from "../supabaseClient.js";
import { tradeToRow, rowToTrade } from "../utils/tradeMapper.js";

export async function listTrades(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("trades")
      .select("*")
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data.map(rowToTrade));
  } catch (err) {
    next(err);
  }
}

export async function createTrade(req, res, next) {
  try {
    if (!req.body.entryPrice || !req.body.date) {
      return res.status(400).json({ error: "date and entryPrice are required" });
    }
    const { data, error } = await supabase
      .from("trades")
      .insert(tradeToRow(req.body))
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(rowToTrade(data));
  } catch (err) {
    next(err);
  }
}

export async function updateTrade(req, res, next) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("trades")
      .update(tradeToRow(req.body))
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Trade not found" });
    res.json(rowToTrade(data));
  } catch (err) {
    next(err);
  }
}

export async function deleteTrade(req, res, next) {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("trades").delete().eq("id", id);
    if (error) throw error;
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
