const fs = require("fs");

const args = process.argv;

const getChainArgs = (args) => {
  return args[2];
};

// Find does file exist
// If file does not exist,
// Create file,
// Else rewrite the file
const finalContractAddressFormat = {
  11155111: {
    CrowdFunding: "XXX",
  },
};

const destinationDir = "./src/contracts";
const contractsDir = "../contracts/ignition/deployments";

try {
  const chainId = getChainArgs(args) ?? "11155111";
  const chainFolders = fs.readdirSync(contractsDir);

  // Only to copy ABI - just copy the targeted chain
  chainFolders.forEach((chain) => {
    const _chain = chain.split("-")[1];
    if (_chain === chainId) {
      const artifactFiles = fs.readdirSync(
        `${contractsDir}/${chain}/artifacts`
      );
      artifactFiles.forEach((_file) => {
        if (!_file.includes("dbg.json")) {
          const _finalFileName = _file.split("#")[1];
          fs.copyFile(
            `${contractsDir}/${chain}/artifacts/${_file}`,
            `${destinationDir}/${_finalFileName}`,
            (err) => {
              if (err) throw err;
              console.log(`${_finalFileName} was copied.`);
            }
          );
        }
      });
    }
  });

  // Copy Deployed Address
  const deployedAddresses = {};
  chainFolders.forEach((chain) => {
    const _chain = chain.split("-")[1];
    deployedAddresses[_chain] = {};
    const obj = JSON.parse(
      fs.readFileSync(
        `${contractsDir}/${chain}/deployed_addresses.json`,
        "utf8"
      )
    );
    Object.keys(obj).forEach((_key) => {
      const newKey = _key.split("#")[1];
      deployedAddresses[_chain][newKey] = obj[_key];
    });
    fs.writeFileSync(
      `${destinationDir}/address.json`,
      JSON.stringify(deployedAddresses)
    );
    console.log(`Contract Addresses were compliled and generated.`);
  });
} catch (error) {
  console.log("Error", error);
  process.exit(1);
}
