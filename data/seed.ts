/**
 * Seed script — seeds all duas into Supabase
 * Run: npx ts-node data/seed.ts
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */
import { createClient } from "@supabase/supabase-js";
import { DUAS } from "./duas";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error(
    "❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});

async function seed() {
  console.log(`⏳  Seeding ${DUAS.length} duas…`);

  const { error } = await supabase
    .from("duas")
    .upsert(
      DUAS.map(({ id: _id, ...dua }) => dua), // Let DB auto-assign IDs
      { onConflict: "slug" }
    );

  if (error) {
    console.error("❌  Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`✅  Successfully seeded ${DUAS.length} duas`);
}

seed();
