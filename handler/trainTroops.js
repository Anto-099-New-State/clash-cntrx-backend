import { exec } from "child_process";

export default async function trainTroopsHandler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  try {
    let { troopTypes, troopAmounts } = req.body;

    if (!Array.isArray(troopTypes) || !Array.isArray(troopAmounts) || troopTypes.length !== troopAmounts.length) {
      throw new Error("❌ troopTypes and troopAmounts must be valid arrays of the same length.");
    }

    const contractAddress = process.env.APTOS_CONTRACT_ADDRESS;
    const privateKey = process.env.APTOS_PRIVATE_KEY;
    if (!contractAddress || !privateKey) throw new Error("❌ Missing environment variables.");

    // Ensure values are correctly formatted
    troopTypes = troopTypes.map(String);
    troopAmounts = troopAmounts.map(Number);

    console.log("✅ Parsed Troop Types:", troopTypes);
    console.log("✅ Parsed Troop Amounts:", troopAmounts);

    // ✅ Construct CLI command
    const cliArgs = troopTypes
      .map((type, index) => `"string:${type}" "u64:${troopAmounts[index]}"`)
      .join(" ");

    console.log("🛠️ Formatted CLI Args:", cliArgs);

    const command = `aptos move run --function-id ${contractAddress}::TroopTraining::train_troops --args ${cliArgs} --profile default --assume-yes`;

    console.log("🚀 Executing Command:", command);

    // ✅ Send initial response before executing the transaction
    res.status(200).json({ message: "🔥 Troop training started!", troops: { troopTypes, troopAmounts } });

    // ✅ Execute Shell Command
    console.log("🛠️ Running Aptos Transaction:", command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Transaction Failed:", error);
        return;
      }
      console.log("✅ Transaction Success:", stdout);
    });

  } catch (error) {
    console.error("❌ Error Processing:", error);
    res.status(500).json({ error: error.message });
  }
}
